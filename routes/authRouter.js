const express = require('express');
const { signup, login, logout } = require('../controllers/authController')
const router = express.Router();

router.post('/signup', signup) // 회원가입
router.post('/login', login) // 로그인
router.delete('/logout', logout) // 로그아웃

module.exports = router;