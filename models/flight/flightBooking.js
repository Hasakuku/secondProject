const mongoose = require("mongoose");
const { Schema } = mongoose;

const flightBookingSchema = new Schema({
   flightBookingId: { type: Number, required: true, unique: true },
   user: { type: Schema.Types.ObjectId, ref: 'User', }, // 회원
   flight: { type: Schema.Types.ObjectId, ref: 'Flight', required: true, }, // 항공편
   name: { type: String, required: true }, // 예약자 이름
   email: { type: String, required: true }, // 예약자 이메일
   phoneNumber: { type: String, required: true }, // 예약자 전화번호
   seatNumber: { type: String, required: true }, // 좌석 번호
   seatClass: { type: String, enum: ['economy', 'business'], required: true },
   // 승객 정보
   passenger: {
      firstName: { type: String, required: true }, // 이름
      lastName: { type: String, required: true }, // 성
      gender: { type: String, required: true }, // 성별
      birthDay: { type: Date, required: true }, // 생년월일
      nationality: { type: String, required: true }, // 국적
      passportNumber: { type: String, required: true }, // 여권 번호
      passportExpiry: { type: Date, required: true } // 여권 만료일
   },
   status: { type: Boolean, default: false }, // 예약 여부
   checkInDate: { type: Date, required: true }, // 체크인 날짜
   checkOutDate: { type: Date, required: true }, // 체크아웃 날짜
   bookingStatus: { // 예약 상태
      type: String,
      enum: ['confirmed', 'waiting', 'cancelled'],
      default: 'waiting',
      required: true
   },
}, { timestamps: true, })

const FlightBooking = mongoose.model('FlightBooking', flightBookingSchema);
module.exports = FlightBooking;
