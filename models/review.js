const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
   reviewId: { type: Number, unique: true },
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

const Counter = require('./counter');
reviewSchema.pre('save', async function (next) {
   var doc = this;
   try {
      // model명으로 counter를 찾아서 seq 필드를 1 증가시킵니다.
      const counter = await Counter.findOneAndUpdate(
         { counter: true },
         { $inc: { reviewId: 1 } },
         { new: true } // 이 옵션은 업데이트된 문서를 반환합니다.
      );
      // 증가된 seq 값을 Id 필드에 저장합니다.
      doc.reviewId = counter.reviewId;
      next();
   } catch (error) {
      return next(error);
   }
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
