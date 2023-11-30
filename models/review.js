const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
   types: { type: String, enum: ['lodging', 'airport', 'attraction'], required: true },
   user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // 리뷰를 작성한 사용자
   lodging: { type: Schema.Types.ObjectId, ref: 'Lodging' }, // 숙소에 대한 리뷰
   airport: { type: Schema.Types.ObjectId, ref: 'Airport' }, // 공항에 대한 리뷰
   attraction: { type: Schema.Types.ObjectId, ref: 'Attraction' }, // 관광지에 대한 리뷰
   content: { type: String, required: true }, // 리뷰 내용
   rating: { type: Number, min: 1, max: 5, required: true }, // 평점
   image: [{ type: String }],
}, {
   timestamps: true
});

reviewSchema.pre('save', function (next) {
   if (this.types === 'lodging') {
      this.airport = undefined;
      this.attraction = undefined;
   }
   if (this.types === 'airport') {
      this.lodging = undefined;
      this.attraction = undefined;
   }
   if (this.types === 'attraction') {
      this.lodging = undefined;
      this.airport = undefined;
   }
   next();
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
/**
 * @swagger
 * components:
 *   schemas:
 *      Review:
 *        type: object
 *        required:
 *          - types
 *          - user
 *          - content
 *          - rating
 *        properties:
 *          types:
 *             type: string
 *             enum: ['lodging', 'airport', 'attraction']
 *          user:
 *             type: string
 *             format: ObjectId
 *             description: 리뷰를 작성한 사용자
 *          lodging:
 *             type: string
 *             format: ObjectId
 *             description: 숙소에 대한 리뷰
 *          attraction:
 *             type: string
 *             format: ObjectId
 *             description: 관광지에 대한 리뷰
 *          content:
 *             type: string
 *             description: 리뷰 내용
 *          rating:
 *             type: number
 *             minimum: 1
 *             maximum: 5
 *             description: 평점
 *          image:
 *             type: array
 *             items:
 *               type: string
 */
