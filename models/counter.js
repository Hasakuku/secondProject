var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Counter 스키마를 생성합니다.
var CounterSchema = new Schema({
   counter: Boolean,
   lodgingId: { type: Number, default: 0 },
   roomBookingId: { type: Number, default: 0 },
   roomTypeId: { type: Number, default: 0 },
   roomId: { type: Number, default: 0 },
   attractionId: { type: Number, default: 0 },
   locationId: { type: Number, default: 0 },
   orderId: { type: Number, default: 0 },
   reviewId: { type: Number, default: 0 },
   userId: { type: Number, default: 0 },
});
Counter = mongoose.model('Counter', CounterSchema);
module.exports = Counter;