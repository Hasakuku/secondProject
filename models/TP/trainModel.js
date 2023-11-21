const mongoose = require("mongoose");
const { Schema } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const trainSchema = new Schema({
   trainId: { type: Number, required: true }, // 기차 ID
   origin: { type: String, required: true }, // 출발지
   destination: { type: String, required: true }, // 도착지
   departureDate: { type: Date, required: true }, // 출발 날짜
   arrivalDate: { type: Date, required: true }, // 도착 날짜
   age: { type: String, enum: ['adult', 'child'] }, // 승객의 연령대
   seat: { // 좌석 정보
      type: String,
      enum: ['economy', 'premium'], // 좌석 등급
      required: true,
      number: { type: String, required: true }, // 좌석 번호
      passenger: { // 승객 정보
         firstName: { type: String, required: true }, // 이름
         lastName: { type: String, required: true }, // 성
         email: { type: String, required: true }, // 이메일
         birthDay: { type: Date, required: true }, // 생년월일
         region: { type: String, required: true }, // 지역
      },
      fare: { // 요금 정보
         adult: { type: Number, }, // 성인 
         child: { type: Number, }, // 아동 
      },
   },
});

trainSchema.plugin(AutoIncrement, { inc_field: 'trainId' });
const Train = mongoose.model('Train', trainSchema);

module.exports = Train;

/**
 * @swagger
 * components:
 *   schemas:
 *     Train:
 *       type: object
 *       required:
 *         - trainId
 *         - origin
 *         - destination
 *         - departureDate
 *         - arrivalDate
 *         - seat
 *         - passenger
 *       properties:
 *         trainId:
 *           type: number
 *           description: 기차 ID
 *         origin:
 *           type: string
 *           description: 출발지
 *         destination:
 *           type: string
 *           description: 도착지
 *         departureDate:
 *           type: string
 *           format: date
 *           description: 출발 날짜
 *         arrivalDate:
 *           type: string
 *           format: date
 *           description: 도착 날짜
 *         age:
 *           type: string
 *           enum: ['adult', 'child']
 *           description: 승객의 연령대
 *         seat:
 *           type: object
 *           required:
 *             - type
 *             - number
 *           properties:
 *             type:
 *               type: string
 *               enum: ['economy', 'premium']
 *               description: 좌석 등급
 *             number:
 *               type: string
 *               description: 좌석 번호
 *             fare:
 *               type: object
 *               properties:
 *                 adult:
 *                   type: number
 *                   description: 성인 요금
 *                 child:
 *                   type: number
 *                   description: 아동 요금
 *         passenger:
 *           type: object
 *           required:
 *             - firstName
 *             - lastName
 *             - email
 *             - birthDate
 *             - region
 *           properties:
 *             firstName:
 *               type: string
 *               description: 이름
 *             lastName:
 *               type: string
 *               description: 성
 *             email:
 *               type: string
 *               description: 이메일
 *             birthDate:
 *               type: string
 *               format: date
 *               description: 생년월일
 *             region:
 *               type: string
 *               description: 지역
 */
