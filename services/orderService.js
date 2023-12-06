const Lodging = require('../models/lodging/lodging');
const RoomType = require('../models/lodging/roomType');
const Room = require('../models/lodging/room');
const User = require('../models/user')
// const LodgingReview = require('../models/lodging/LodgingReview');
const RoomBooking = require('../models/lodging/roomBooking');
const { InternalServerError, BadRequestError, NotFoundError } = require('../utils/customError')

const orderService = {
   // 예약 생성
   async createBooking(users, order) {
      const data = order
      const user = users._id
      // 새로운 Room 인스턴스를 생성
      const newRoomBooking = new RoomBooking({ user, ...data });
      // Room 인스턴스를 데이터베이스에 저장
      const savedRoomBooking = await newRoomBooking.save();

      return savedRoomBooking;
   },

   // 예약 상태 업데이트
   async updateRoomBookingStatus(users, bookingInfo) {
      const { roomBookingId, status } = bookingInfo;
      // roomId에 해당하는 객실을 찾아 예약 상태를 업데이트
      const updatedRoom = await RoomBooking.findOneAndUpdate(
         { roomBookingId: roomBookingId },
         {
            $set: {
               status: status,
            },
         },
         { new: true } // 업데이트된 문서를 반환
      );

      return updatedRoom;
   },
   async getUserBookings(userId) {
      const user = await User.findOne({ userId: userId })
      // 유저 ID를 기반으로 RoomBooking 모델에서 예약 목록을 찾습니다.
      const bookings = await RoomBooking.find({ user: user })
         .populate('user') // 'user' 필드를 populate하여 유저 정보를 가져옵니다.
         .populate('room') // 'room' 필드를 populate하여 방 정보를 가져옵니다.
         .exec(); // 쿼리를 실행합니다.
      if (!bookings[0]) throw new NotFoundError('예약 내역이 없습니다.')
      return bookings; // 예약 목록을 반환합니다.
   },
}

module.exports = orderService