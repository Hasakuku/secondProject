const mongoose = require('mongoose');
const { Schema } = mongoose;
const roomSchema = new Schema({
   roomId: { type: Number, required: true, unique: true },
   roomType: { type: Schema.Types.ObjectId, ref: 'RoomType', },
   roomNumber: { type: Number, required: true }, // 방번호
   floor: { type: Number, required: true }, // 방이 위치한 층수
}, {
   timestamps: true
});
const Counter = require('../counter');
roomSchema.pre('save', async function (next) {
   var doc = this;
   try {
      // model명으로 counter를 찾아서 seq 필드를 1 증가시킵니다.
      const counter = await Counter.findOneAndUpdate(
         { counter: true },
         { $inc: { roomId: 1 } },
         { new: true } // 이 옵션은 업데이트된 문서를 반환합니다.
      );
      // 증가된 seq 값을 Id 필드에 저장합니다.
      doc.roomId = counter.roomId;
      next();
   } catch (error) {
      return next(error);
   }
});

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
