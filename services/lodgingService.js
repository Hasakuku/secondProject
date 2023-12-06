const Lodging = require('../models/lodging/lodging');
const RoomType = require('../models/lodging/roomType');
const Room = require('../models/lodging/room');
const Location = require('../models/location')
// const LodgingReview = require('../models/lodging/LodgingReview');
const RoomBooking = require('../models/lodging/roomBooking');
const { InternalServerError, BadRequestError } = require('../utils/customError')

const lodgingServices = {
   //*인기 호텔 및 숙소
   async getTopLodgings(city) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      // 특정 도시 & 리뷰수 10개 이상
      let filteredLodgings = await Lodging.find({
         location: city,
         'review.1': { $exists: true }
      },).populate('review').populate({
         path: 'rooms',
         populate: {
            path: 'roomType',
            model: 'RoomType'
         }
      }).exec();
      // 예약 가능한 객실 여부
      for (let lodging of filteredLodgings) {
         for (let room of lodging.rooms) {
            const bookings = await RoomBooking.find({
               room: room._id,
               checkInDate: { $lt: tomorrow },
               checkOutDate: { $gt: today },
               status: { $ne: false }
            });
            room.isAvailable = bookings.length === 0;
         }
      }
      filteredLodgings = filteredLodgings.filter(
         lodging => lodging.rooms.some(room => room.isAvailable));
      // 각 숙소의 평균 평점 
      filteredLodgings.forEach(lodging => {
         let totalRating = 0;
         lodging.review.forEach(review => {
            totalRating += review.rating;
         });
         lodging.avgRating = totalRating / lodging.review.length;
      });
      // 상위 4개의 숙소
      const lodgings = filteredLodgings
         .sort((a, b) => b.avgRating - a.avgRating)
         .slice(0, 4)
         .map(lodging => {
            // 객실 중 최저가
            const minPriceRoom = lodging.rooms.reduce(
               (min, room) => room.roomType && room.roomType.price < min.roomType.price ? room : min, lodging.rooms[0]
            );
            return {
               lodgingId: lodging.lodgingId,
               name: lodging.name,
               mainImage: lodging.mainImage,
               avgRating: lodging.avgRating,
               reviewCount: lodging.review.length,
               theme: lodging.theme,
               minPrice: minPriceRoom && minPriceRoom.roomType ? minPriceRoom.roomType.price : null
            };
         });
      return lodgings;
   },

   //* 숙소 상세 검색(1페이지당 20개)
   async lodgingsList(locationId, checkInDate, checkOutDate, adults, children, level, page, item, sort) {
      const checkIn = new Date(checkInDate)
      const checkOut = new Date(checkOutDate)
      // 특정 도시와 성급에 해당하는 숙소
      const findLocation = await Location.findOne({ locationId: locationId });
      const selectCity = { location: findLocation._id };
      if (level) selectCity.level >= level;

      let lodgings = await Lodging.find(selectCity).populate('review').populate({
         path: 'rooms',
         populate: {
            path: 'roomType',
            model: 'RoomType'
         }
      }).exec();
      // 예약 가능한 객실 여부
      for (let lodging of lodgings) {
         for (let room of lodging.rooms) {
            const bookings = await RoomBooking.find({
               room: room._id,
               checkInDate: { $lt: checkOut },
               checkOutDate: { $gt: checkIn },
               status: { $ne: true }
            });
            room.isAvailable = bookings.length === 0;
         }
      }
      lodgings = lodgings.filter(
         lodging => lodging.rooms.some(room => room.isAvailable));
      // 체크인&아웃 날짜와 객실당 인원 수 
      const availableLodgings = lodgings.filter(lodging => {
         return lodging.rooms.some(room => {
            return room.roomType.capacity >= adults + children
         });
      });
      // 반환값
      const results = availableLodgings.map(lodging => {
         const minPriceRoom = lodging.rooms.reduce(
            (min, room) => room.roomType && room.roomType.price < min.roomType.price ? room : min, lodging.rooms[0]
         );
         minPrice = minPriceRoom && minPriceRoom.roomType ? minPriceRoom.roomType.price : null;

         return ({
            lodgingId: lodging.lodgingId,
            hotelName: lodging.name,
            minPrice: minPrice,
            mainImage: lodging.mainImage,
            reviewCount: lodging.review.length,
            theme: lodging.theme,
            averageRating: (lodging.review.reduce(
               (sum, review) => sum + review.rating, 0) / lodging.review.length).toFixed(2),
         })
      }
      );
      let sortedItems;
      switch (sort) {
         case 'price':
            sortedItems = results.sort((a, b) => a.minPrice - b.minPrice);
            break;
         case 'rating':
            sortedItems = results.sort((a, b) => b.averageRating - a.averageRating);
            break;
         case 'review':
            sortedItems = results.sort((a, b) => b.reviewCount - a.reviewCount);
            break;
         default:
            sortedItems = results;
      }
      // return sortedItems
      //페이지 네이션
      let perPage = item || 20;
      const start = (page - 1) * perPage;
      const end = page * perPage;
      const result = sortedItems.slice(start, end);
      return result;
   },

   //* 숙소 상세페이지
   async getLodgingDetail(lodgingID) {
      // 숙소 정보 조회
      const lodging = await Lodging.findOne({ lodgingId: lodgingID }).populate('rooms').populate('review');
      if (!lodging) {
         throw new BadRequestError('숙소를 찾을 수 없습니다.');
      }
      let totalRating = 0;
      lodging.review.forEach(review => {
         totalRating += review.rating;
      });
      lodging.avgRating = (totalRating / lodging.review.length).toFixed(2);
      const rooms = lodging.rooms;
      // 객실 유형 id 조회
      let roomTypeIds = [];
      for (let room of rooms) {
         if (!roomTypeIds.includes(room.roomType)) {
            roomTypeIds.push(room.roomType);
         }
      }
      // 객실 유형 데이터 조회
      let roomTypes = [];
      for (let roomTypeId of roomTypeIds) {
         const roomType = await RoomType.findOne({ _id: roomTypeId });
         roomTypes.push(roomType);
      }
      //반환값
      const result = { lodging: lodging, roomType: roomTypes }
      if (!result) {
         throw new InternalServerError('객실을 조회할 수 없습니다.')
      }
      return result;
   },
}

module.exports = lodgingServices

// 최근 예약 객실 조회
// const lastBookedRoom = lodging.rooms.reduce((lastRoom, room) => {
//    if (!room.status) return lastRoom;
//    if (!lastRoom || lastRoom.checkInDate < room.checkInDate) {
//       return room;
//    }
//    return lastRoom;
// }, null);