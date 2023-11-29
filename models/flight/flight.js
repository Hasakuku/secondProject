const mongoose = require("mongoose");
const { Schema } = mongoose;

const flightSchema = new Schema({
   flightId: { type: Number, required: true, unique: true },
   airplane: { type: String, enum: ["Boeing ", "Airbus"], required: true }, // 항공기
   airline: { type: String, enum: ["Korean-Air", "Asiana"], required: true }, // 항공사
   departure: { type: Schema.Types.ObjectId, ref: 'Location', required: true }, // 출발지
   destination: { type: Schema.Types.ObjectId, ref: 'Location', required: true }, // 도착지
   departureTime: { type: Date, required: true }, // 출발 날짜
   arrivalTime: { type: Date, required: true }, // 도착 날짜

   economy: {
      fare: { type: Number, required: true },
      total: { type: Number, required: true },
      remain: { type: Number },
      reserve: { type: Number, default: 0 },
   },
   business: {
      fare: { type: Number, required: true },
      total: { type: Number, required: true },
      remain: { type: Number },
      reserve: { type: Number, default: 0 },
   },
}, {
   timestamps: true
});

flightSchema.pre('save', function (next) {
   this.economy.remain = this.economy.total - this.economy.reserve;
   this.business.remain = this.business.total - this.business.reserve;
   next();
});
// flightSchema.virtual('remainingBusinessSeat').get(function () {
//    return this.businessSeat - this.reservedBusinessSeat;
// });

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;

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