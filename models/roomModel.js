const mongoose = require('mongoose');
const { Schema } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const roomSchema = new Schema({
   roomId: { type: Number, required: true },
   roomInfo: {
      name: { type: String, required: true }, // 객실 이름(A101)
      types: { type: String, required: true }, // 유형 (예시: 싱글룸, 더블룸 등)
      price: { type: Number, required: true }, // 1박 요금
      capacity: { type: Number, required: true }, // 수용 가능 인원(성인기준)
      bedType: { type: String, required: true }, // 침대 유형 (예시: 킹 사이즈, 퀸 사이즈 등)
      size: { type: Number, required: true }, // 방의 크기 (단위: m^2)
      floor: { type: Number, required: true }, // 방이 위치한 층수
      image: [{ type: String, }], // 객실 사진
      amenities: { type: [String] }, // 제공되는 편의 시설 (예시: 와이파이, 에어컨 등)
   },
   roomBooking: {
      status: { type: Boolean, default: false }, // 예약가능 여부
      checkInDate: { type: Date, required: true }, // 체크인 날짜
      checkOutDate: { type: Date, required: true }, // 체크아웃 날짜
      adults: { type: Number, required: true }, // 성인 수
      children: { type: Number }, // 아이 수
      infants: { type: Number }, // 유아 수
      bookingStatus: { // 예약 상태
         type: String,
         enum: ['confirmed', 'waiting', 'cancelled'],
         required: true
      },
   },
}, {
   timestamps: true
});

roomSchema.plugin(AutoIncrement, { inc_field: 'roomId' });
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       required:
 *         - roomId
 *         - roomInfo
 *         - roomBooking
 *       properties:
 *         roomId:
 *           type: number
 *           description: 객실 ID
 *         roomInfo:
 *           type: object
 *           required:
 *             - name
 *             - types
 *             - price
 *             - capacity
 *             - bedType
 *             - size
 *             - floor
 *           properties:
 *             name:
 *               type: string
 *               description: 객실 이름
 *             types:
 *               type: string
 *               description: 객실 유형
 *             price:
 *               type: number
 *               description: 1박 요금
 *             capacity:
 *               type: number
 *               description: 수용 가능 인원
 *             bedType:
 *               type: string
 *               description: 침대 유형
 *             size:
 *               type: number
 *               description: 방의 크기
 *             floor:
 *               type: number
 *               description: 방이 위치한 층수
 *             image:
 *               type: array
 *               items:
 *                 type: string
 *               description: 객실 사진
 *             amenities:
 *               type: array
 *               items:
 *                 type: string
 *               description: 제공되는 편의 시설
 *         roomBooking:
 *           type: object
 *           required:
 *             - status
 *             - checkInDate
 *             - checkOutDate
 *             - adults
 *             - bookingStatus
 *           properties:
 *             status:
 *               type: boolean
 *               default: false
 *               description: 예약 가능 여부
 *             checkInDate:
 *               type: string
 *               format: date
 *               description: 체크인 날짜
 *             checkOutDate:
 *               type: string
 *               format: date
 *               description: 체크아웃 날짜
 *             adults:
 *               type: number
 *               description: 성인 수
 *             children:
 *               type: number
 *               description: 아이 수
 *             infants:
 *               type: number
 *               description: 유아 수
 *             bookingStatus:
 *               type: string
 *               enum: ['confirmed', 'waiting', 'cancelled']
 *               description: 예약 상태
 */
