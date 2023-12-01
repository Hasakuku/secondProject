const mongoose = require('mongoose');
const { Schema } = mongoose;

const lodgingSchema = new Schema({
   lodgingId: { type: Number, required: true,unique: true },
   attraction: { type: Schema.Types.ObjectId, ref: 'Attraction' }, // 관광지
   types: { // 숙소 유형
      type: String,
      enum: ['hotel', 'apart', 'motel', 'hostel', 'guestHouse'],
      default: "hotel"
   },
   level: { type: Number, min: 0, max: 5, }, // 숙소일 경우 성급
   theme: [{ type: String }], // 숙소 테마 (예시: 온천숙소, 야경 명소)
   name: { type: String, required: true }, // 숙소 이름
   location: { type: Schema.Types.ObjectId, ref: 'Location', },
   address: { type: String, required: true },
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
   rule: { type: String, }, // 숙소 정책
   description: { type: String, required: true }, //  설명
   avgRating: { type: Number, default: 0 }, // 평균 평점
   review: [{ type: Schema.Types.ObjectId, ref: 'Review', }], // 숙소 리뷰
})
lodgingSchema.pre('save', function (next) {
   // 숙소 유형이 'hotel'이 아니면 level필드를 제거
   if (this.types !== 'hotel') {
      this.level = undefined;
   }
   next();
});
const Counter = require('../counter');
lodgingSchema.pre('save', async function (next) {
   var doc = this;
   try {
      // model명으로 counter를 찾아서 seq 필드를 1 증가시킵니다.
      const counter = await Counter.findOneAndUpdate(
         { counter: true },
         { $inc: { lodgingId: 1 } },
         { new: true } // 이 옵션은 업데이트된 문서를 반환합니다.
      );
      // 증가된 seq 값을 Id 필드에 저장합니다.
      doc.lodgingId = counter.lodgingId;
      next();
   } catch (error) {
      return next(error);
   }
});

const Lodging = mongoose.model('Lodging', lodgingSchema);
module.exports = Lodging;

// 숙소 옵션	상세
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
 *         - address
 *         - option
 *       properties:
 *         lodgingId:
 *           type: number
 *           description: 숙소 ID
 *         attraction:
 *           type: string
 *           description: 연관 관광지
 *         types:
 *           type: string
 *           enum: [hotel, apart, motel, hostel, guestHouse]
 *           default: hotel
 *           description: 숙소 유형
 *         theme:
 *           type: string
 *           description: 숙소 테마
 *         name:
 *           type: string
 *           description: 숙소 이름
 *         address:
 *           type: object
*           description: 주소
 *         rooms:
 *           type: array
 *           items:
 *             type: string
 *           description: 객실
 *         map:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *               description: 위도
 *             longitude:
 *               type: number
 *               description: 경도
 *         option:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: 옵션 카테고리
 *               details:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: 옵션
 *         image:
 *           type: array
 *           items:
 *             type: string
 *           description: 이미지
 *         mainImage:
 *           type: string
 *           description: 메인이미지
 *         rule:
 *           type: string
 *           description: 숙소정책
 *         description:
 *           type: string
 *           description: 설명
 *         review:
 *           type: array
 *           items:
 *             type: string
 *           description: 리뷰 목록
 */
