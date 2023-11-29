const mongoose = require('mongoose');
const { Schema } = mongoose;

const airportReviewSchema = new Schema({
   user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // 리뷰를 작성한 사용자
   content: { type: String, required: true }, // 리뷰 내용
   rating: { type: Number, min: 1, max: 5, required: true }, // 평점
   image: [{ type: String }],
}, {
   timestamps: true
});

const AirportReview = mongoose.model('AirportReview', airportReviewSchema);
module.exports = AirportReview;
