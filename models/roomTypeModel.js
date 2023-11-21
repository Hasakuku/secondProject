const mongoose = require('mongoose');
const { Schema } = mongoose;
   
const roomTypeSchema = new Schema({
   name: { type: Number, required: true }, // 객실 이름 (패밀리, 스위트 등)
   types: { type: String, required: true }, // 유형 (싱글룸, 더블룸 등)
   bedType: { type: String, required: true }, // 침대 유형 (킹 사이즈 등)
   price: { type: Number, required: true }, // 1박 요금
   capacity: { type: Number, required: true }, // 수용 가능 인원(성인기준)
   size: { type: Number, required: true }, // 방의 크기 (단위: m^2)
   image: [{ type: String, }], // 객실 사진
   amenities: { type: [String] }, // 제공되는 편의 시설 (와이파이, 에어컨 등)
});

const RoomType = mongoose.model('RoomType', roomTypeSchema);
module.exports = RoomType;

/**
 * @swagger
 * components:
 *   schemas:
 *     RoomType:
 *       type: object
 *       required:
 *         - name
 *         - types
 *         - bedType
 *         - price
 *         - capacity
 *         - size
 *       properties:
 *         name:
 *           type: number
 *           description: 객실 이름 
 *         types:
 *           type: string
 *           description: 유형 
 *         bedType:
 *           type: string
 *           description: 침대 유형 
 *         price:
 *           type: number
 *           description: 1박 요금
 *         capacity:
 *           type: number
 *           description: 수용 가능 인원
 *         size:
 *           type: number
 *           description: 방의 크기 
 *         image:
 *           type: array
 *           items:
 *             type: string
 *           description: 객실 사진
 *         amenities:
 *           type: array
 *           items:
 *             type: string
 *           description: 제공되는 편의 시설 
 */