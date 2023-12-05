const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    userId: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true }, // 이메일
    password: { type: String, required: true }, // 비밀번호
    name: { type: String, required: true }, // 이름
    phoneNumber: { type: String }, // 전화번호
    favorites: {// 즐겨찾기
        attractions: [{ type: Schema.Types.ObjectId, ref: 'Attraction' }],
        lodgings: [{ type: Schema.Types.ObjectId, ref: 'Lodging' }],
    },
    level: { // 사용자의 등급
        type: String,
        enum: ['silver', 'gold', 'platinum', 'diamond'],
        default: 'silver',
    },
    // bookings: [{ type: Schema.Types.ObjectId, ref: 'RoomBooking' }],
    // secretCode: { type: String, },
    isAdmin: { type: Boolean, default: false }, // 관리자인지 여부 
    deleteAt: { type: Date, default: null }, // 계정 삭제 시간
}, {
    timestamps: true
});
const Counter = require('./counter');
userSchema.pre('save', async function (next) {
    var doc = this;
    try {
        // model명으로 counter를 찾아서 seq 필드를 1 증가시킵니다.
        const counter = await Counter.findOneAndUpdate(
            { counter: true },
            { $inc: { userId: 1 } },
            { new: true } // 이 옵션은 업데이트된 문서를 반환합니다.
        );
        // 증가된 seq 값을 Id 필드에 저장합니다.
        doc.userId = counter.userId;
        next();
    } catch (error) {
        return next(error);
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
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
