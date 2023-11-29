const mongoose = require("mongoose");
const { Schema } = mongoose;

const airportSchema = new Schema({
   airportId: { type: Number, required: true, unique: true },
   name: { type: String, required: true }, // 공항 이름
   location: { type: Schema.Types.ObjectId, ref: 'Location', },
   address: { type: String, required: true },
   map: {
      latitude: { type: Number }, // 위도
      longitude: { type: Number }, // 경도
   },
   image: [{ type: String }],
   mainImage: { type: String },
   review: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
}, { timestamps: true, })

const Airport = mongoose.model('Airport', airportSchema);
module.exports = Airport;
