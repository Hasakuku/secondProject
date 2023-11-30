const asynchandler = require('express-async-handler')
const Lodging = require('../models/lodging/lodging');
const Attraction = require('../models/attraction/attraction');
const Location = require('../models/location')
const Review = require('../models/review')
const { BadRequestError, NotFoundError, } = require('../utils/customError');
const Airport = require('../models/flight/airport');
// 키워드를 받아 숙소를 검색하는 함수
const findItems = async (Model, keyword, type) => {
   let items;
   let queries = Model.find({
      $or: [
         { address: { $regex: keyword, $options: 'i' } },
         { name: { $regex: keyword, $options: 'i' } },
         // { country: { $regex: keyword, $options: 'i' } }
      ]
   }).populate('review');

   if (type === 'lodging') {
      const populateOptions = {
         path: 'rooms',
         populate: {
            path: 'roomType',
            model: 'RoomType'
         }
      };
      items = await queries.populate(populateOptions);
   } else {
      items = await queries.exec()
   }
   items.forEach(item => {
      let totalRating = 0;
      item.review.forEach(review => {
         totalRating += review.rating;
      });
      item.avgRating = totalRating / item.review.length;
   });
   return items;
};
const mapItems = (items, start, end, type, sort) => {
   const a = items
      .slice(start, end)
      .map(item => {
         let minPrice = undefined;
         if (type === 'lodging') {
            const minPriceRoom = item.rooms.reduce(
               (min, room) => room.roomType && room.roomType.price < min.roomType.price ? room : min, item.rooms[0]
            );
            minPrice = minPriceRoom && minPriceRoom.roomType ? minPriceRoom.roomType.price : null;
         }
         if (type === 'attraction') {
            minPrice = item.ticket.adult.price;
         }
         return {
            [`${type}Id`]: item[`${type}Id`],
            name: item.name,
            address: item.address,
            avgRating: (item.avgRating).toFixed(2),
            reviewCount: item.review.length,
            location: item.location,
            mainImage: item.mainImage,
            map: item.map,
            minPrice: minPrice
         };
      });
   let sortedItems;
   switch (sort) {
      case 'price':
         sortedItems = a.sort((a, b) => a.minPrice - b.minPrice);
         break;
      case 'rating':
         sortedItems = a.sort((a, b) => b.avgRating - a.avgRating);
         break;
      case 'review':
         sortedItems = a.sort((a, b) => b.reviewCount - a.reviewCount);
         break;
      default:
         sortedItems = a;
   }
   return sortedItems
};

const searchList = asynchandler(async (req, res) => {
   const { keyword, item, page, type, sort } = req.query;
   const perPage = item;
   const start = (page - 1) * perPage;
   const end = page * perPage;
   let result = {};
   let Model;
   if (!type) {
      const models = [Lodging, Attraction, Airport]; // 사용할 모델 목록
      for (const model of models) {
         const type = (model.modelName).toLowerCase()
         const items = await findItems(model, keyword, type);
         result[model.modelName] = mapItems(items, start, end, type, sort);
      }
      res.json(result);
      return;
   }
   switch (type) {
      case "lodging":
         Model = Lodging;
         break;
      case "attraction":
         Model = Attraction;
         break;
      case "airport":
         Model = Airport;
         break;
      default:
         throw new BadRequestError('잘못된 타입입니다.')
   }
   const items = await findItems(Model, keyword, type);
   // console.log(items)
   result[type] = mapItems(items, start, end, type, sort);
   res.json(result)
});

// 리뷰 생성
const createReview = asynchandler(async (req, res) => {
   const results = new Review(req.body)
   await results.save();
   res.status(201).json({ message: "success" })
})

// 특정 유저의 리뷰 조회
const getUserReview = asynchandler(async (req, res) => {
   const userId = req.user._id
   const reviews = await Review.find({ user: userId });
   if (!reviews) throw new NotFoundError('리뷰를 찾을 수 없습니다.')
   res.status(201).json(reviews)
})

// 리뷰삭제

// 위치 목록
const locationList = asynchandler(async (req, res) => {
   const result = await Location.find({});
   res.status(200).json(result)
})
module.exports = { searchList, createReview, getUserReview, locationList }