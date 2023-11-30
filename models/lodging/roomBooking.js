const mongoose = require('mongoose');
const { Schema } = mongoose;
const roomBookingSchema = new Schema({
   roomBookingId: { type: Number, required: true, unique: true },
   user: { type: Schema.Types.ObjectId, ref: 'User', },// 회원
   firstName: { type: String, required: true }, // 예약자 이름
   lastName: { type: String, required: true }, // 예약자 성
   email: { type: String, required: true }, // 예약자 이메일
   phoneNumber: { type: String, required: true }, // 예약자 전화 번호
   
   room: { type: Schema.Types.ObjectId, ref: 'Room', },
   status: { type: Boolean, default: false }, // 예약 가능 여부
   checkInDate: { type: Date, required: true }, // 체크인 날짜
   checkOutDate: { type: Date, required: true }, // 체크아웃 날짜

   adults: { type: Number, required: true }, // 성인 수
   children: { type: Number }, // 아이 수
   request: { type: String }, // 요청사항
   bookingStatus: { // 예약 상태
      type: String,
      enum: ['confirmed', 'waiting', 'cancelled'],
      default: 'waiting',
      required: true
   },
});

const RoomBooking = mongoose.model('RoomBooking', roomBookingSchema);
module.exports = RoomBooking;

/**
 * @swagger
 * components:
 *   schemas:
 *     RoomBooking:
 *       type: object
 *       properties:
 *         roomBookingId:
 *           type: integer
 *           description: 객실 예약 ID
 *         user:
 *           type: string
 *           format: ObjectId
 *           description: 회원
 *         firstName:
 *           type: string
 *           description: 예약자 이름
 *         lastName:
 *           type: string
 *           description: 예약자 성
 *         email:
 *           type: string
 *           format: email
 *           description: 예약자 email
 *         phoneNumber:
 *           type: string
 *           description: 예약자 전화번호
 *         room:
 *           type: string
 *           format: ObjectId
 *           description: 예약 객실
 *         status:
 *           type: boolean
 *           description: 예약 여부
 *         checkInDate:
 *           type: string
 *           format: date
 *           description: 체크인
 *         checkOutDate:
 *           type: string
 *           format: date
 *           description: 체크아웃
 *         adults:
 *           type: integer
 *           description: 성인 수
 *         children:
 *           type: integer
 *           description: 어린이 수
 *         request:
 *           type: string
 *           description: 요청사항
 *         bookingStatus:
 *           type: string
 *           enum: [confirmed, waiting, cancelled]
 *           description: 예약 상태
 *       required:
 *         - roomBookingId
 *         - user
 *         - firstName
 *         - lastName
 *         - email
 *         - phoneNumber
 *         - room
 *         - checkInDate
 *         - checkOutDate
 *         - adults
 *         - bookingStatus
 */