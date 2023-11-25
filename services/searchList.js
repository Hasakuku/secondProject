const asynchandler = require('express-async-handler')
const Lodging = require('../models/lodgingModel');
const Attraction = require('../models/attractionModel');
const { BadRequestError } = require('../utils/customError');
// 키워드를 받아 숙소를 검색하는 함수
const findItems = async (Model, keyword, type) => {
   let query = Model.find({
      $or: [
         { 'address.city': { $regex: keyword, $options: 'i' } },
         { 'address.county': { $regex: keyword, $options: 'i' } },
         { 'address.district': { $regex: keyword, $options: 'i' } },
         { 'address.detail': { $regex: keyword, $options: 'i' } },
         { name: { $regex: keyword, $options: 'i' } },
         { country: { $regex: keyword, $options: 'i' } }
      ]
   }).populate('review');

   if (type === 'lodging') {
      query = query.populate({
         path: 'rooms',
         populate: {
            path: 'roomType',
            model: 'RoomType'
         }
      });
   }

   const items = await query.exec();
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
         let minPrice = null;
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
            id: item[`${type}Id`],
            name: item.name,
            mainImage: item.mainImage,
            avgRating: (item.avgRating).toFixed(2),
            reviewCount: item.review.length,
            country: item.country,
            map: item.map,
            address: item.address,
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

module.exports = asynchandler(async (req, res) => {
   const { keyword, item, page, type, sort } = req.query;
   const perPage = item;
   const start = (page - 1) * perPage;
   const end = page * perPage;
   let result = {};
   let Model;
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
         const models = [Lodging, Attraction]; // 사용할 모델 목록
         for (const model of models) {
            const type = (model.modelName).toLowerCase()
            const items = await findItems(model, keyword, type);
            result[model.modelName] = mapItems(items, start, end, type, sort);
         }
         res.json(result);
         return;
      // default: throw new BadRequestError('잘못된 타입입니다.')
   }
   const items = await findItems(Model, keyword, type);
   result[type] = mapItems(items, start, end, type, sort);
   res.json(result)
});
