const mongoose = require('mongoose');
const { Schema } = mongoose;
const roomBookingSchema = new Schema({
   roomBookingId: { type: Number, required: true, unique: true },
   user: { type: Schema.Types.ObjectId, ref: 'User', },// 회원
   firstName: { type: String, required: true }, // 예약자 이름
   lastName: { type: String, required: true }, // 예약자 성
   email: { type: String, required: true }, // 예약자 이메일
   phoneNumber: { type: String, required: true }, // 예약자 전화 번호
   
   room: { type: Schema.Types.ObjectId, ref: 'Room', },
   status: { type: Boolean, default: false }, // 예약 가능 여부
   checkInDate: { type: Date, required: true }, // 체크인 날짜
   checkOutDate: { type: Date, required: true }, // 체크아웃 날짜

   adults: { type: Number, required: true }, // 성인 수
   children: { type: Number }, // 아이 수
   request: { type: String }, // 요청사항
   bookingStatus: { // 예약 상태
      type: String,
      enum: ['confirmed', 'waiting', 'cancelled'],
      default: 'waiting',
      required: true
   },
});

const RoomBooking = mongoose.model('RoomBooking', roomBookingSchema);
module.exports = RoomBooking;

// const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');
// const { Schema } = mongoose;

// // Initialize autoIncrement
// autoIncrement.initialize(mongoose.connection);

// const roomBookingSchema = new Schema({
//    // ... your schema setup
// });

// // Apply the autoIncrement plugin to roomBookingSchema.
// roomBookingSchema.plugin(autoIncrement.plugin, {
//     model: 'RoomBooking',
//     field: 'roomBookingId',
//     startAt: 1,
//     incrementBy: 1
// });

// const RoomBooking = mongoose.model('RoomBooking', roomBookingSchema);
// module.exports = RoomBooking;
