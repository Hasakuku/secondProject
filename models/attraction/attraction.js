const mongoose = require('mongoose');
const { Schema } = mongoose;
const ticketSchema = new Schema({
   adult: {
      price: { type: Number, default: 0 }, // 가격
      period: { type: String, default: "1day" }, // 유효기간
      mandatoryTicket: { type: Boolean, default: true, } // 입장권 수령 필수 여부
   },
   youth: {
      price: { type: Number, default: 0 },
      period: { type: String, default: "1day" },
      mandatoryTicket: { type: Boolean, default: true, }
   },
   child: {
      price: { type: Number, default: 0 },
      period: { type: String, default: "1day" },
      mandatoryTicket: { type: Boolean, default: true, }
   }
})

const attractionSchema = new Schema({
   attractionId: { type: Number, required: true, unique: true },
   lodging: { type: Schema.Types.ObjectId, ref: 'Lodging' }, // 숙소 
   types: { type: String, enum: ['activity', 'landmark'], required: true },
   name: { type: String, unique: true }, // 여행지
   location: { type: Schema.Types.ObjectId, ref: 'Location' },
   address: { type: String, required: true },
   map: {
      latitude: { type: Number }, // 위도
      longitude: { type: Number }, // 경도
   },
   phoneNumber: { type: String }, // 전화번호
   description: { type: String, required: true }, // 설명
   image: [{ type: String }], // 여행지 이미지 URL
   mainImage: { type: String, }, // 대표이미지 
   ticket: ticketSchema,
   operatingTime: { // HH.mm
      open: { type: String },
      close: { type: String },
   }, // 운영시간
   recommendTourTime: { type: Number }, // 추천 관광시간/단위 시간
   avgRating: Number,
   review: [{ type: Schema.Types.ObjectId, ref: 'Review', }], // 관광 리뷰
});

const Attraction = mongoose.model('Attraction', attractionSchema);
module.exports = Attraction;

/**
 * @swagger
 * components:
 *   schemas:
 *     Attraction:
 *       type: object
 *       required:
 *         - attractionId
 *         - lodging
 *         - types
 *         - name
 *         - country
 *         - description
 *       properties:
 *         attractionId:
 *           type: number
 *           description: 여행지 ID
 *         lodging:
 *           type: string
 *           description: 숙소
 *         types:
 *           type: string
 *           enum: ['activity', 'landmark']
 *           description: 여행지 유형
 *         name:
 *           type: string
 *           description: 여행지 이름
 *         country:
 *           type: string
 *           description: 국가
 *         address:
 *           type: object
 *           properties:
 *             city:
 *               type: string
 *               description: 시
 *             county:
 *               type: string
 *               description: 군
 *             district:
 *               type: string
 *               description: 구
 *             detail:
 *               type: string
 *               description: 상세 주소
 *         map:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *               description: 위도
 *             longitude:
 *               type: number
 *               description: 경도
 *         phoneNumber:
 *           type: string
 *           description: 전화번호
 *         description:
 *           type: string
 *           description: 설명
 *         image:
 *           type: array
 *           items:
 *             type: string
 *           description: 여행지 이미지 URL
 *         ticket:
 *           $ref: '#/components/schemas/Ticket'
 *         operatingTime:
 *           type: object
 *           properties:
 *             open:
 *               type: string
 *               description: 오픈 시간
 *             close:
 *               type: string
 *               description: 마감 시간
 *         recommendTourTime:
 *           type: number
 *           description: 추천 관광시간
 *         review:
 *           type: array
 *           items:
 *             type: string
 *           description: 관광 리뷰
 *     Ticket:
 *       type: object
 *       properties:
 *         adult:
 *           type: object
 *           properties:
 *             price:
 *               type: number
 *               default: 0
 *               description: 성인 요금
 *             period:
 *               type: string
 *               default: "1day"
 *               description: 유효기간
 *             mandatoryTicket:
 *               type: boolean
 *               default: true
 *               description: 입장권 수령 필수 여부
 *         youth:
 *           type: object
 *           properties:
 *             price:
 *               type: number
 *               default: 0
 *               description: 청소년 요금
 *             period:
 *               type: string
 *               default: "1day"
 *               description: 유효기간
 *             mandatoryTicket:
 *               type: boolean
 *               default: true
 *               description: 입장권 수령 필수 여부
 *         child:
 *           type: object
 *           properties:
 *             price:
 *               type: number
 *               default: 0
 *               description: 어린이 요금
 *             period:
 *               type: string
 *               default: "1day"
 *               description: 유효기간
 *             mandatoryTicket:
 *               type: boolean
 *               default: true
 *               description: 입장권 수령 필수 여부
 */
