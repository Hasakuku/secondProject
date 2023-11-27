const mongoose = require('mongoose');
const { Schema } = mongoose;

const lodgingReviewSchema = new Schema({
   reviewId: { type: Number, required: true },
   user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // 리뷰를 작성한 사용자
   content: { type: String, required: true }, // 리뷰 내용
   rating: { type: Number, min: 1, max: 5, required: true }, // 평점
   image: { type: String },
   createdAt: { type: Date, default: Date.now }, // 리뷰가 작성된 날짜
}, {
   timestamps: true
});

const LodgingReview = mongoose.model('LodgingReview', lodgingReviewSchema);
module.exports = LodgingReview;

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - reviewId
 *         - user
 *         - content
 *         - rating
 *       properties:
 *         reviewId:
 *           type: number
 *           description: The review ID
 *         user:
 *           type: string
 *           description: The ID of the user who wrote the review
 *         content:
 *           type: string
 *           description: The content of the review
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           description: The rating of the review
 *         image:
 *           type: string
 *           description: The URL of the image
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date when the review was created
 */
