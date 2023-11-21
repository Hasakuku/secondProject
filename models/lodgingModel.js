const mongoose = require('mongoose');
const { Schema } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const lodgingSchema = new Schema({
   lodgingId: { type: Number, required: true },
   attraction: { type: Schema.Types.ObjectId, ref: 'Attraction' }, // 관광지
   types: { // 숙소 유형
      type: String,
      enum: ['hotel', 'apart', 'motel', 'hostel', 'guestHouse'],
      default: "hotel"
   },
   level: { type: Number, min: 0, max: 5, }, // 호텔일 경우 성급
   theme: [{ type: String }], // 숙소 테마 (예시: 온천호텔, 야경 명소)
   name: { type: String, required: true }, // 숙소 이름
   address: {
      city: { type: String }, // 시
      county: { type: String }, // 군
      district: { type: String }, // 구
      detail: { type: String }, // 상세
   },
   rooms: [{ type: Schema.Types.ObjectId, ref: 'Room', required: true }], // 객실 목록
   map: {
      latitude: { type: Number }, // 위도
      longitude: { type: Number }, // 경도
   },
   option: [{ // 서비스&편의시설
      category: { type: String, required: true }, // 옵션의 카테고리 (예시: 프론트서비스 등)
      details: { type: [String] } // 옵션의 세부 사항(예시: 벨멘, 24시간서비스..)
   }],
   image: [{ type: [String], required: true }], // 이미지 URL
   mainImage: {
      type: String,
   },
   description: { type: String, required: true }, //  설명
   review: { type: [Schema.Types.ObjectId], ref: 'Review', }, // 호텔 리뷰
})
lodgingSchema.pre('save', function (next) {
   // 숙소 유형이 'hotel'이 아니면 level필드를 제거
   if (this.types !== 'hotel') {
      this.level = undefined;
   }
   next();
});

lodgingSchema.plugin(AutoIncrement, { inc_field: 'lodgingId' });
const Lodging = mongoose.model('Lodging', lodgingSchema);

module.exports = Lodging;

// 호텔 옵션	상세
// 프런트데스크서비스	VIP 체크인, 24시간 프론트 데스크, 안전금고, 벨맨, 짐보관
// 식사 및 음료 서비스	키오스크/편의점
// 건강 및 웰니스 시설	피트니스룸
// 공용공간	안내사항, 쇼핑몰, 엘리베이터, 중앙환기시스템, 공용키친, 전객실금연, 공용공간 금연, 정원, 흡연구역, 음향 시스템(공공구역)
// 청소서비스	세탁실
// 비즈니스 서비스	회의실, 비즈니스 센터, 팩스/복사 서비스, 다목적실, 비즈니스 시설&서비스
// 장애인 편의시설	계단없는 입구, 장애인 지원객, 점자안내
// 안전 및 보안	공용공간 CCTV, 의무실, 구급상자, 소화기, 보안요원, 보안 경보기, 연기 감지기

/**
 * @swagger
 * components:
 *   schemas:
 *     Lodging:
 *       type: object
 *       required:
 *         - lodgingId
 *         - name
 *         - rooms
 *         - image
 *         - description
 *       properties:
 *         lodgingId:
 *           type: number
 *           description: The lodging ID
 *         destination:
 *           type: string
 *           description: The ID of the destination
 *         types:
 *           type: string
 *           enum: [hotel, apart, motel, hostel, guestHouse]
 *           default: hotel
 *           description: The type of the lodging
 *         theme:
 *           type: string
 *           description: The theme of the lodging
 *         name:
 *           type: string
 *           description: The name of the lodging
 *         address:
 *           type: object
 *           properties:
 *             city:
 *               type: string
 *               description: The city of the lodging
 *             county:
 *               type: string
 *               description: The county of the lodging
 *             district:
 *               type: string
 *               description: The district of the lodging
 *             detail:
 *               type: string
 *               description: The detailed address of the lodging
 *         rooms:
 *           type: array
 *           items:
 *             type: string
 *           description: The list of room IDs
 *         map:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *               description: The latitude of the lodging
 *             longitude:
 *               type: number
 *               description: The longitude of the lodging
 *         option:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: The category of the option
 *               details:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The details of the option
 *         image:
 *           type: array
 *           items:
 *             type: string
 *           description: The URLs of the images
 *         mainImage:
 *           type: string
 *           description: The URL of the main image
 *         description:
 *           type: string
 *           description: The description of the lodging
 *         review:
 *           type: array
 *           items:
 *             type: string
 *           description: The list of review IDs
 */
