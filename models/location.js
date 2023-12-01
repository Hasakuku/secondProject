const mongoose = require("mongoose");
const { Schema } = mongoose;

const locationSchema = new Schema({
   locationId: { type: Number, required: true, unique: true },
   // name: { type: String, required: true },
   country: { type: String, required: true },
   province: { type: String, },
   city: { type: String, required: true },
   map: {
      latitude: Number,
      longitude: Number
   },
   // airport: { type: Schema.Types.ObjectId, ref: 'Airport', },
   // lodging: [{ type: Schema.Types.ObjectId, ref: 'Lodging', }],
   // attraction: [{ type: Schema.Types.ObjectId, ref: 'Attraction', }],
   // description: { type: String },
   // image: [{ type: String }],
   // review: [{ type: String }]
})

const Counter = require('./counter');
locationSchema.pre('save', async function (next) {
   var doc = this;
   try {
      // model명으로 counter를 찾아서 seq 필드를 1 증가시킵니다.
      const counter = await Counter.findOneAndUpdate(
         { counter: true },
         { $inc: { locationId: 1 } },
         { new: true } // 이 옵션은 업데이트된 문서를 반환합니다.
      );
      // 증가된 seq 값을 Id 필드에 저장합니다.
      doc.locationId = counter.locationId;
      next();
   } catch (error) {
      return next(error);
   }
});
const Location = mongoose.model('Location', locationSchema)
module.exports = Location;
/**
 * const locationSchema = new Schema({
   name: { type: String, required: true },
   country: { type: String, required: true },
   province: { type: String, },
   city: { type: String, },
   airport: { type: Schema.Types.ObjectId, ref: 'Airport', },
   image: [{ type: String }]
})

이 몽구스 스키마를 토대로 json형식의 예시 데이터를 생성해주세요
나라는 대한민국 도시는 서울, 제주, 서귀포, 부산, 인천, 속초, 강릉, 경주 
 */

/**
 * 
 * /location:
 *   post:
 *     summary: Add a new location
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - locationId
 *               - country
 *               - city
 *             properties:
 *               locationId:
 *                 type: integer
 *                 description: The id of the location.
 *               country:
 *                 type: string
 *                 description: The country of the location.
 *               province:
 *                 type: string
 *                 description: The province of the location.
 *               city:
 *                 type: string
 *                 description: The city of the location.
 *               map:
 *                 type: object
 *                 properties:
 *                   latitude:
 *                     type: number
 *                     description: The latitude of the location.
 *                   longitude:
 *                     type: number
 *                     description: The longitude of the location.
 *     responses:
 *       200:
 *         description: The location was successfully created.
 *       400:
 *         description: The location was not created due to invalid input.
 */
/** 
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       required:
 *         - locationId
 *         - country
 *         - city
 *       properties:
 *         locationId:
 *           type: integer
 *           description: Unique identifier for the location
 *         country:
 *           type: string
 *           description: The country where the location is
 *         province:
 *           type: string
 *           description: The province where the location is
 *         city:
 *           type: string
 *           description: The city where the location is
 *         map:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *               format: float
 *               description: The latitude of the location
 *             longitude:
 *               type: number
 *               format: float
 *               description: The longitude of the location
 */