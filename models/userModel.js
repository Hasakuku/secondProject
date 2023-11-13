const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    birthDay: {
        type: Date,
        default: Date.now,
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        // zonecode: {type: String, required: true},
        // basicAddress: {type: String, required: true},
        // detailAddress: { type: String },
    },
   //  userRole: {
   //      type: String,
   //      enum: ['admin', 'user', 'seller'],
   //      default: 'user',
   //  },
    deleteAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;