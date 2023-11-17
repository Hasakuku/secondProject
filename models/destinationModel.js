const mongoose = require('mongoose');
const { Schema } = mongoose;

const destinationSchema = new Schema({
   name: { type: String, required: true, unique: true }, // 여행지
   country: { type: String, required: true }, // 국가
   city: { type: String, required: true }, // 도시
   address: {type: String}, // 주소
   map: {
      latitude: { type: Number }, // 위도
       longitude: { type: Number }, // 경도
     },
   phoneNumber: {type: String}, // 전화번호
   description: { type: String, required: true }, // 설명
   image: [{ type: String }], // 여행지 이미지 URL
   ticket: ticketSchema,
   tourTime: { type: Number }, // 추천 관광시간 (단위: 시간)
   review: { type: [Schema.Types.ObjectId], ref: 'Review', }, // 관광 리뷰
});

const ticketSchema = new Schema({
   adult: { 
      price: { type: String, required: true }, // 가격
      period: { type: String, required: true }, // 유효기간
      mandatoryTicket: { type: Boolean, required: true, default: true, } // 입장권 수령 필수 여부
   },
   youth: { 
      price: { type: String, required: true }, 
      period: { type: String, required: true }, 
      mandatoryTicket: { type: Boolean, required: true, default: true, } 
   },
   child: { 
      price: { type: String, required: true }, 
      period: { type: String, required: true }, 
      mandatoryTicket: { type: Boolean, required: true, default: true, } 
   }
})

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;