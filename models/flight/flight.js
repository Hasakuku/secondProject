const mongoose = require("mongoose");
const { Schema } = mongoose;

const flightSchema = new Schema({
   flightId: { type: Number, required: true, unique: true },
   airplane: { type: String, enum: ["Boeing ", "Airbus"], required: true }, // 항공기
   airline: { type: String, enum: ["Korean-Air", "Asiana"], required: true }, // 항공사
   departure: { type: Schema.Types.ObjectId, ref: 'Location', required: true }, // 출발지
   destination: { type: Schema.Types.ObjectId, ref: 'Location', required: true }, // 도착지
   departureTime: { type: Date, required: true }, // 출발 날짜
   arrivalTime: { type: Date, required: true }, // 도착 날짜

   economy: {
      fare: { type: Number, required: true },
      total: { type: Number, required: true },
      remain: { type: Number },
      reserve: { type: Number, default: 0 },
   },
   business: {
      fare: { type: Number, required: true },
      total: { type: Number, required: true },
      remain: { type: Number },
      reserve: { type: Number, default: 0 },
   },
}, {
   timestamps: true
});

flightSchema.pre('save', function (next) {
   this.economy.remain = this.economy.total - this.economy.reserve;
   this.business.remain = this.business.total - this.business.reserve;
   next();
});
// flightSchema.virtual('remainingBusinessSeat').get(function () {
//    return this.businessSeat - this.reservedBusinessSeat;
// });

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;

