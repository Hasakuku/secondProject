const express = require('express');
const { signup, login, logout } = require('../controllers/authController')
const router = express.Router();
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: 회원가입
 *     tags: [Users]
 */
router.post('/signup', signup)

/**
 * @swagger
 * /login:
 *   post:
 *     summary: 로그인
 *     tags: [Users]
 */
router.post('/login', login)

/**
 * @swagger
 * /logout:
 *   delete:
 *     summary: 로그아웃
 *     tags: [Users]
 */
router.delete('/logout', logout)

module.exports = router;