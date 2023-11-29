const mongoose = require("mongoose");
const { Schema } = mongoose;

const locationSchema = new Schema({
   locationId: { type: Number, required: true, unique: true },
   // name: { type: String, required: true },
   country: { type: String, required: true },
   province: { type: String, },
   city: { type: String, required: true },
   map: {
      latitude: Number,
      longitude: Number
   },
   airport: { type: Schema.Types.ObjectId, ref: 'Airport', },
   // lodging: [{ type: Schema.Types.ObjectId, ref: 'Lodging', }],
   // attraction: [{ type: Schema.Types.ObjectId, ref: 'Attraction', }],
   description: { type: String },
   image: [{ type: String }],
   review: [{ type: String }]
})
const Location = mongoose.model('Location', locationSchema)
module.exports = Location;
/**
 * const locationSchema = new Schema({
   name: { type: String, required: true },
   country: { type: String, required: true },
   province: { type: String, },
   city: { type: String, },
   airport: { type: Schema.Types.ObjectId, ref: 'Airport', },
   image: [{ type: String }]
})

이 몽구스 스키마를 토대로 json형식의 예시 데이터를 생성해주세요
나라는 대한민국 도시는 서울, 제주, 서귀포, 부산, 인천, 속초, 강릉, 경주 
 */