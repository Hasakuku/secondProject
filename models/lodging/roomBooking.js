const mongoose = require('mongoose');
const { Schema } = mongoose;
const roomBookingSchema = new Schema({
   roomBookingId: { type: Number, unique: true },
   user: { type: Schema.Types.ObjectId, ref: 'User', },// 회원
   lodging: { type: Schema.Types.ObjectId, ref: 'Lodging', },
   // firstName: { type: String, required: true }, // 예약자 이름
   // lastName: { type: String, required: true }, // 예약자 성
   // email: { type: String, required: true }, // 예약자 이메일
   // phoneNumber: { type: String, required: true }, // 예약자 전화 번호

   room: { type: Schema.Types.ObjectId, ref: 'Room', },
   status: { type: Boolean, default: true }, // 예약 여부
   checkInDate: { type: Date, required: true }, // 체크인 날짜
   checkOutDate: { type: Date, required: true }, // 체크아웃 날짜

   adults: { type: Number, required: true }, // 성인 수
   children: { type: Number }, // 아이 수
   request: { type: String }, // 요청사항
   // bookingStatus: { // 예약 상태
   //    type: String,
   //    enum: ['confirmed', 'waiting', 'cancelled'],
   //    default: 'waiting',
   //    required: true
   // },
   deletedAt: { type: Date, default: null },
}, { timestamps: true });
const Counter = require('../counter');
roomBookingSchema.pre('save', async function (next) {
   var doc = this;
   try {
      // model명으로 counter를 찾아서 seq 필드를 1 증가시킵니다.
      const counter = await Counter.findOneAndUpdate(
         { counter: true },
         { $inc: { roomBookingId: 1 } },
         { new: true } // 이 옵션은 업데이트된 문서를 반환합니다.
      );
      // 증가된 seq 값을 Id 필드에 저장합니다.
      doc.roomBookingId = counter.roomBookingId;
      next();
   } catch (error) {
      return next(error);
   }
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
 *         lodging:
 *           type: string
 *           format: ObjectId
 *           description: 예약 숙소
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
 *         deleteAt:
 *           type: date
 *           description: 삭제 시간
 *       required:
 *         - roomBookingId
 *         - user
 *         - lodging
 *         - room
 *         - status
 *         - checkInDate
 *         - checkOutDate
 *         - adults
 */