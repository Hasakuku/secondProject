const Lodging = require('../models/lodgingModel');
const RoomType = require('../models/roomTypeModel');
const Room = require('../models/roomModel');
const Review = require('../models/reviewModel');
const { InternalServerError, BadRequestError } = require('../utils/customError')

const lodgingServices = {
   //*인기 호텔 및 숙소
   async getTopLodgings(city) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      // 특정 도시 & 리뷰수 10개 이상
      const filteredLodgings = await Lodging.find({
         'address.city': city,
         'review.1': { $exists: true }
      },).populate('review').populate({
         path: 'rooms',
         populate: {
            path: 'roomType',
            model: 'RoomType'
         }
      }).exec();
      // 예약 가능한 객실 여부
      filteredLodgings.filter(lodging => {
         return lodging.rooms.some(room => {
            return (
               room.roomBooking &&
               !room.roomBooking.status
               ||
               room.roomBooking && (room.roomBooking.checkOutDate < today ||
                  room.roomBooking.checkInDate > tomorrow)
            );
         });
      });
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
               minPrice: minPriceRoom && minPriceRoom.roomType ? minPriceRoom.roomType.price : null
            };
         });
      return lodgings;
   },

   //* 숙소 상세 검색(1페이지당 20개)
   async lodgingsList(city, checkInDate, checkOutDate, adults, children, level, page, item) {
      // 특정 도시와 성급에 해당하는 숙소
      const selectCity = { 'address.city': city };
      if (level) selectCity.level >= level;

      const lodgings = await Lodging.find(selectCity).populate('review').populate({
         path: 'rooms',
         populate: {
            path: 'roomType',
            model: 'RoomType'
         }
      }).exec();
      // 체크인&아웃 날짜와 객실당 인원 수 
      const availableLodgings = lodgings.filter(lodging => {
         return lodging.rooms.some(room => {
            return room.roomType.capacity >= adults + children &&
               (!room.roomBooking.status ||
                  room.roomBooking.checkOutDate < checkInDate ||
                  room.roomBooking.checkInDate > checkOutDate);
         });
      });

      // 반환값
      const results = availableLodgings.map(lodging =>
      ({
         lodgingId: lodging.lodgingId,
         hotelName: lodging.name,
         mainImage: lodging.mainImage,
         reviewCount: lodging.review.length,
         averageRating: lodging.review.reduce((sum, review) => sum + review.rating, 0) / lodging.review.length,
      })
      );
      //페이지 네이션
      const perPage = item;
      const start = (page - 1) * perPage;
      const end = page * perPage;
      const result = results.slice(start, end);
      return result;
   },

   //* 숙소 상세페이지
   async getLodgingDetail(lodgingID) {
      // 숙소 정보 조회
      const lodging = await Lodging.findOne({ lodgingId: lodgingID }).populate('rooms');
      if (!lodging) {
         throw new BadRequestError('숙소를 찾을 수 없습니다.');
      }
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
//    if (!room.roomBooking.status) return lastRoom;
//    if (!lastRoom || lastRoom.roomBooking.checkInDate < room.roomBooking.checkInDate) {
//       return room;
//    }
//    return lastRoom;
// }, null);