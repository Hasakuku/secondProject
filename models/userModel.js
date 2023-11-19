const mongoose = require('mongoose');
const { Schema } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new Schema({
    userId: { type: Number, required: true },
    email: { type: String, required: true, unique: true }, // 이메일
    password: { type: String, required: true }, // 비밀번호
    name: { type: String, required: true }, // 이름
    phoneNumber: { type: String }, // 전화번호
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }], // 사용자의 예약 목록
    favorites: [{ // 즐겨찾기
        type: Schema.Types.ObjectId,
        ref: 'Attraction',
        required: true,
    }],
    level: {
        type: String,
        enum: ['silver', 'gold', 'platinum', 'diamond'],
        default: 'silver',
    }, // 사용자의 등급
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }], // 사용자가 작성한 리뷰들
    order: { type: Schema.Types.ObjectId, ref: 'Order' }, // 예약
    isAdmin: { type: Boolean, default: false }, // 관리자인지 여부 
    deleteAt: { type: Date, default: null }, // 계정 삭제 시간
}, {
    timestamps: true
});

userSchema.plugin(AutoIncrement, { inc_field: 'userId' });
const User = mongoose.model('User', userSchema);

module.exports = User;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - userId
 *         - email
 *         - password
 *         - name
 *       properties:
 *         userId:
 *           type: number
 *           description: The user ID
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the user
 *         orders:
 *           type: array
 *           items:
 *             type: string
 *           description: The list of order IDs
 *         favorites:
 *           type: array
 *           items:
 *             type: string
 *           description: The list of favorite attraction IDs
 *         level:
 *           type: string
 *           enum: [silver, gold, platinum, diamond]
 *           default: silver
 *           description: The level of the user
 *         reviews:
 *           type: array
 *           items:
 *             type: string
 *           description: The list of review IDs
 *         order:
 *           type: string
 *           description: The ID of the order
 *         isAdmin:
 *           type: boolean
 *           default: false
 *           description: Whether the user is an admin or not
 *         deleteAt:
 *           type: string
 *           format: date-time
 *           description: The date when the account was deleted
 */
