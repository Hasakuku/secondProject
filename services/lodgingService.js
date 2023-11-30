const Lodging = require('../models/lodging/lodging');
const RoomType = require('../models/lodging/roomType');
const Room = require('../models/lodging/room');
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
      for (let lodging of filteredLodgings) {
         for (let room of lodging.rooms) {
            const bookings = await RoomBooking.find({
               room: room._id,
               checkInDate: { $lt: tomorrow },
               checkOutDate: { $gt: today },
               bookingStatus: { $ne: 'cancelled' }
            });
            room.isAvailable = bookings.length === 0;
         }
      }
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
               (!room.status ||
                  room.checkOutDate < checkInDate ||
                  room.checkInDate > checkOutDate);
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
   // 예약 생성
   async createBooking(order) {
      const data = order
      // 새로운 Room 인스턴스를 생성
      const newRoomBooking = new RoomBooking(
         data
      );

      // Room 인스턴스를 데이터베이스에 저장
      const savedRoomBooking = await newRoomBooking.save();

      return savedRoomBooking;
   },

   // 예약 상태 업데이트
   async updateRoomBookingStatus(bookingInfo) {
      const { roomBookingId, bookingStatus, status } = bookingInfo;

      // roomId에 해당하는 객실을 찾아 예약 상태를 업데이트
      const updatedRoom = await RoomBooking.findOneAndUpdate(
         { roomBookingId: roomBookingId },
         {
            $set: {
               status: status,
               bookingStatus: bookingStatus,
            },
         },
         { new: true } // 업데이트된 문서를 반환
      );

      return updatedRoom;
   }
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