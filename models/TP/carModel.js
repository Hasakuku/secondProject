const mongoose = require("mongoose");
const { Schema } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const carSchema = new Schema({
   carId: { type: Number, required: true }, // 차량 ID
   pickupLocation: { type: String, required: true }, // 인수 장소
   returnLocation: { type: String, required: true }, // 인수 장소
   pickupTime: { type: Date }, // 차량 인수 일시
   returnTime: { type: Date }, // 차량 반납 일시
   driverAge: { type: Number }, // 운전자 나이
   fare: { type: Number }, // 요금
   driver: { // 운전자 정보
      firstName: { type: String, required: true }, // 이름
      lastName: { type: String, required: true }, // 성
      age: { type: Number, required: true }, // 나이
      email: { type: String, required: true }, // 이메일
      phoneNumber: { type: String, required: true }, // 전화번호
   }
});

carSchema.plugin(AutoIncrement, { inc_field: 'carId' });
const Car = mongoose.model('Car', carSchema);

module.exports = Car;

/**
 * 
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *         - carId
 *         - pickupLocation
 *         - returnLocation
 *         - driver
 *       properties:
 *         carId:
 *           type: number
 *           description: 차량 ID
 *         pickupLocation:
 *           type: string
 *           description: 인수 장소
 *         returnLocation:
 *           type: string
 *           description: 반납 장소
 *         pickupTime:
 *           type: string
 *           format: date
 *           description: 차량 인수 일시
 *         returnTime:
 *           type: string
 *           format: date
 *           description: 차량 반납 일시
 *         driverAge:
 *           type: number
 *           description: 운전자 나이
 *         fare:
 *           type: number
 *           description: 요금
 *         driver:
 *           type: object
 *           required:
 *             - firstName
 *             - lastName
 *             - age
 *             - email
 *             - phoneNumber
 *           properties:
 *             firstName:
 *               type: string
 *               description: 이름
 *             lastName:
 *               type: string
 *               description: 성
 *             age:
 *               type: number
 *               description: 나이
 *             email:
 *               type: string
 *               description: 이메일
 *             phoneNumber:
 *               type: string
 *               description: 전화번호
 */