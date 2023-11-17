const mongoose = require("mongoose");
const { Schema } = mongoose

const reservationSchema = new Schema ({
	userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // 예약자 ID
	hotel: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true }, // 예약한 호텔 ID
	transportation: { type: Schema.Types.ObjectId, ref: 'Transportation', }, // 선택한 교통 수단의 ID
	checkInDate: { type: Date, required: true }, // 체크인 날짜
	checkOutDate: { type: Date, required: true }, // 체크아웃 날짜
	status: { type: String, enum: ['confirmed', 'waiting', 'cancelled'], required: true }, // 예약 상태
},{
	timestamps: true
})

const Reservation = mongoose.model('Reservation', reservationSchema)

module.exports = Reservation;