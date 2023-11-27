const mongoose = require('mongoose');
const { Schema } = mongoose;
const roomSchema = new Schema({
   roomId: { type: Number, required: true, },
   roomType: { type: Schema.Types.ObjectId, ref: 'RoomType', },
   roomNumber: { type: Number, required: true }, // 방번호
   floor: { type: Number, required: true }, // 방이 위치한 층수
}, {
   timestamps: true
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;

/**
 * @swagger
 * components:
 *   schemas:
 *     RoomBooking:
 *       type: object
 *       required:
 *         - status
 *         - checkInDate
 *         - checkOutDate
 *         - adults
 *         - bookingStatus
 *       properties:
 *         status:
 *           type: boolean
 *           description: 예약 여부
 *         checkInDate:
 *           type: string
 *           format: date
 *           description: 체크인 날짜
 *         checkOutDate:
 *           type: string
 *           format: date
 *           description: 체크아웃 날짜
 *         adults:
 *           type: number
 *           description: 성인 수
 *         children:
 *           type: number
 *           description: 아이 수
 *         bookingStatus:
 *           type: string
 *           enum: ['confirmed', 'waiting', 'cancelled']
 *           description: 예약 상태
 *     Room:
 *       type: object
 *       required:
 *         - roomId
 *         - roomType
 *         - roomNumber
 *         - floor
 *       properties:
 *         roomId:
 *           type: number
 *           description: 방 ID
 *         roomType:
 *           type: string
 *           format: objectId
 *           description: 객실 유형 ID
 *         roomNumber:
 *           type: number
 *           description: 방번호
 *         floor:
 *           type: number
 *           description: 방이 위치한 층수
 *         roomBooking:
 *           $ref: '#/components/schemas/RoomBooking'
 */
