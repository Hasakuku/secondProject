const mongoose = require('mongoose');
const { Schema } = mongoose;
const roomBookingSchema = new Schema({
   user: { type: Schema.Types.ObjectId, ref: 'User', },
   // passenger: {type:Schema.Types.ObjectId, ref: 'Passenger',},
   room: { type: Schema.Types.ObjectId, ref: 'Room', },
   roomBookingpo: { type: Number, },
   status: { type: Boolean, default: false }, // 예약 여부
   checkInDate: { type: Date, required: true }, // 체크인 날짜
   checkOutDate: { type: Date, required: true }, // 체크아웃 날짜
   adults: { type: Number, required: true }, // 성인 수
   children: { type: Number }, // 아이 수
   bookingStatus: { // 예약 상태
      type: String,
      enum: ['confirmed', 'waiting', 'cancelled'],
      default: 'waiting',
      required: true
   },
});

const RoomBooking = mongoose.model('RoomBooking', roomBookingSchema);
module.exports = RoomBooking;