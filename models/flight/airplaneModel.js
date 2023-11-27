const mongoose = require("mongoose");
const { Schema } = mongoose;

const airplaneSchema = new Schema({
   airplaneId: { type: Number, required: true }, // 비행기의 고유 ID
   origin: { type: String, required: true }, // 출발지
   destination: { type: String, required: true }, // 도착지
   departureDate: { type: Date, required: true }, // 출발 날짜
   arrivalDate: { type: Date, required: true }, // 도착 날짜
   

   flightType: { type: String, enum: ['one-way', 'round-trip'] }, // 비행 타입 (편도 또는 왕복)
   age: { type: String, enum: ['adult', 'child', 'infant'] }, // 승객의 연령대 (성인, 아동, 유아)
   seat: { // 좌석
      type: String,
      enum: ['economy', 'premium', 'business', 'first-class'],
      required: true,
      number: { type: String, required: true }, // 좌석 번호
      fare: { // 요금 정보
         adult: { type: Number, required: true, }, // 성인 요금
         child: { type: Number, }, // 아동 요금
         infant: { type: Number, default: 0, } // 유아 요금
      },
   },
   passenger: { // 승객 정보
      firstName: { type: String, required: true }, // 이름
      lastName: { type: String, required: true }, // 성
      gender: { type: String, required: true }, // 성별
      birthDay: { type: Date, required: true }, // 생년월일
      nationality: { type: String, required: true }, // 국적
      passportNumber: { type: String, required: true }, // 여권 번호
      passportExpiry: { type: Date, required: true } // 여권 만료일
   },
});

const Airplane = mongoose.model('Airplane', airplaneSchema);

module.exports = Airplane;

/**
 * @swagger
 * components:
 *   schemas:
 *     Airplane:
 *       type: object
 *       required:
 *         - airplaneId
 *         - origin
 *         - destination
 *         - departureDate
 *         - arrivalDate
 *         - seat
 *         - passenger
 *       properties:
 *         airplaneId:
 *           type: number
 *           description: 비행기의 고유 ID
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
 *         flightType:
 *           type: string
 *           enum: ['one-way', 'round-trip']
 *           description: 비행 타입 (편도 또는 왕복)
 *         age:
 *           type: string
 *           enum: ['adult', 'child', 'infant']
 *           description: 승객의 연령대 (성인, 아동, 유아)
 *         seat:
 *           type: object
 *           required:
 *             - type
 *             - number
 *           properties:
 *             type:
 *               type: string
 *               enum: ['economy', 'premium', 'business', 'first-class']
 *               description: 좌석
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
 *                 infant:
 *                   type: number
 *                   default: 0
 *                   description: 유아 요금
 *         passenger:
 *           type: object
 *           required:
 *             - firstName
 *             - lastName
 *             - gender
 *             - birthDate
 *             - nationality
 *             - passportNumber
 *             - passportExpiry
 *           properties:
 *             firstName:
 *               type: string
 *               description: 이름
 *             lastName:
 *               type: string
 *               description: 성
 *             gender:
 *               type: string
 *               description: 성별
 *             birthDate:
 *               type: string
 *               format: date
 *               description: 생년월일
 *             nationality:
 *               type: string
 *               description: 국적
 *             passportNumber:
 *               type: string
 *               description: 여권 번호
 *             passportExpiry:
 *               type: string
 *               format: date
 *               description: 여권 만료일
 */