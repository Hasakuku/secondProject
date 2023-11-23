const asynchandler = require('express-async-handler')
const Lodging = require('../models/lodgingModel');
const Attraction = require('../models/attractionModel');
const { BadRequestError } = require('../utils/customError');
// 키워드를 받아 숙소를 검색하는 함수
module.exports = asynchandler(async (req, res) => {
   const { keyword, item, page, type } = req.query
   // const items = Number(item)
   const perPage = item;
   const start = (page - 1) * perPage;
   const end = page * perPage;
   // 주소, 이름, 나라 필드에서 키워드를 포함하는 숙소를 찾습니다.
   let result = {};
   switch (type) {
      case "lodging":
         const findLodgings = await Lodging.find({
            $or: [
               { 'address.city': { $regex: keyword, $options: 'i' } },
               { 'address.county': { $regex: keyword, $options: 'i' } },
               { 'address.district': { $regex: keyword, $options: 'i' } },
               { 'address.detail': { $regex: keyword, $options: 'i' } },
               { name: { $regex: keyword, $options: 'i' } },
               { country: { $regex: keyword, $options: 'i' } }
            ]
         }).populate('review').populate({
            path: 'rooms',
            populate: {
               path: 'roomType',
               model: 'RoomType'
            }
         }).exec();
         findLodgings.forEach(lodging => {
            let totalRating = 0;
            lodging.review.forEach(review => {
               totalRating += review.rating;
            });
            lodging.avgRating = totalRating / lodging.review.length;
         });
         // 상위 item개의 숙소
         const lodgings = findLodgings
            .sort((a, b) => b.avgRating - a.avgRating)
            .slice(start, end)
            // console.log(lodgings)
            .map(lodging => {
               // 객실 중 최저가
               const minPriceRoom = lodging.rooms.reduce(
                  (min, room) => room.roomType && room.roomType.price < min.roomType.price ? room : min, lodging.rooms[0]
               );
               console.log(minPriceRoom)
               return {
                  lodgingId: lodging.lodgingId,
                  name: lodging.name,
                  mainImage: lodging.mainImage,
                  avgRating: lodging.avgRating,
                  reviewCount: lodging.review.length,
                  country: lodging.country,
                  address: lodging.address,
                  minPrice: minPriceRoom && minPriceRoom.roomType ? minPriceRoom.roomType.price : null
               };
            });
         result.lodgings = lodgings;
         break;
      case "attraction":
         // 관광지
         const findAttractions = await Attraction.find({
            $or: [
               { 'address.city': { $regex: keyword, $options: 'i' } },
               { 'address.county': { $regex: keyword, $options: 'i' } },
               { 'address.district': { $regex: keyword, $options: 'i' } },
               { 'address.detail': { $regex: keyword, $options: 'i' } },
               { name: { $regex: keyword, $options: 'i' } },
               { country: { $regex: keyword, $options: 'i' } }
            ]
         }).populate('review');
         findAttractions.forEach(attraction => {
            let totalRating = 0;
            attraction.review.forEach(review => {
               totalRating += review.rating;
            });
            attraction.avgRating = totalRating / attraction.review.length;
         });
         // 상위 item개의 숙소
         const attractions = findAttractions
            .sort((a, b) => b.avgRating - a.avgRating)
            .slice(start, end)
            .map(attraction => {
               return {
                  attractionId: attraction.lodgingId,
                  name: attraction.name,
                  mainImage: attraction.mainImage,
                  avgRating: attraction.avgRating,
                  reviewCount: attraction.review.length,
                  address: attraction.address,
                  country: attraction.country,
               };
            });
         result.attractions = attractions;
         break;
         default: throw new BadRequestError('잘못된 타입입니다.')
   }
   res.json(result)

})

