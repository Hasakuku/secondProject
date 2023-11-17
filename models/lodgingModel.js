const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomSchema = new Schema({
   name: { type: String, required: true }, // 객실 이름
   type: { type: String, required: true }, // 유형 (예시: 싱글룸, 더블룸 등)
   price: { type: Number, required: true }, // 1박 요금
   capacity: { type: Number, required: true }, // 수용 가능 인원
   bedType: { type: String, required: true }, // 침대 유형 (예시: 킹 사이즈, 퀸 사이즈 등)
   size: { type: Number, required: true }, // 방의 크기 (단위: m^2)
   floor: { type: Number, required: true }, // 방이 위치한 층수
   amenities: { type: [String] }, // 제공되는 편의 시설 (예시: 와이파이, 에어컨 등)
   status: { type: Boolean, default: false }, // 예약가능 여부
},{
   timestamps: true
});

const lodgingSchema = new Schema({
   types: { // 숙소 유형
      type: String,
      enum: ['hotel', 'apart', 'motel', 'hostel', 'guestHouse'],
      default: "hotel"
   },
   theme: { type: String }, // 숙소 테마 (예시: 온천호텔, 야경 명소)
   name: { type: String, required: true }, // 숙소 이름
   address: { type: String, required: true }, // 숙소 주소
   rooms: [roomSchema], // 객실 목록
   map: {
      latitude: { type: Number }, // 위도
      longitude: { type: Number }, // 경도
   },
   option: [{ // 서비스&편의시설
      category: { type: String, required: true }, // 옵션의 카테고리 (예시: 프론트서비스 등)
      details: { type: [String] } // 옵션의 세부 사항(예시: 벨멘, 24시간서비스..)
   }], 
   image: { type: [String], required: true }, // 이미지 URL
   description: { type: String, required: true }, //  설명
   review: { type: [Schema.Types.ObjectId], ref: 'Review', }, // 호텔 리뷰
})

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