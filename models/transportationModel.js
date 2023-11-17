const mongoose = require("mongoose");
const { Schema } = mongoose;

const transportationSchema = new Schema({
	types: { 
			type: String,
			enum: ['airplane', 'train', 'car'], // 교통 수단 유형
			required: true
			},
	origin: { type: String, required: true }, // 출발지
	destination: { type: String, required: true }, // 도착지
	departureDate: { type: Date, required: true }, // 출발 날짜
	arrivalDate: { type: Date, required: true }, // 도착 날짜
})

const Transportation = mongoose.model('Transportation', transportationSchema);

module.exports = Transportation;