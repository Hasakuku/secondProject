const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
   user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // 리뷰를 작성한 사용자의 ID
   content: { type: String, required: true }, // 리뷰 내용
   rating: { type: Number, min: 1, max: 5, required: true }, // 별점 (1에서 5까지)
   image:{type: String},
   createdAt: { type: Date, default: Date.now }, // 리뷰가 작성된 날짜
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;