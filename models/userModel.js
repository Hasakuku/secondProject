const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true }, // 이메일
    password: { type: String, required: true }, // 비밀번호
    name: { type: String, required: true }, // 이름
    phoneNumber: { type: String }, // 전화번호
    favorites: { type: [String], }, // 즐겨찾기
    level: { type: String, enum: ['silver', 'gold', 'platinum', 'diamond'], default: 'silver' }, // 사용자의 등급
    // payment: { type: Schema.Types.ObjectId, ref: Payment, required: true }, // 사용자의 결제 정보
    isAdmin: { type: Boolean, default: false }, // 관리자인지 여부 
    deleteAt: { type: Date, default: null }, // 계정 삭제 시간
},{
    timestamps: true
}
);

const User = mongoose.model('User', userSchema);

module.exports = User;