const express = require('express');
const userController= require('../controllers/userController')
const router = express.Router();

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.delete('/logout', userController.logout)
router.get('/findUser', userController.findUser)

module.exports = router;

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: 사용자 등록
 *     requestBody:  
 *       required: true
 *       content:
 *         application/json:  
 *           schema: 
 *             type: object
 *             properties:  
 *               email:
 *                 type: string
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               birthDay:
 *                 type: string
 *               address:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *                 default: false
 *             required:  
 *               - email
 *               - userName
 *               - password
 *               - birthDay
 *               - address
 *               - isAdmin
 *     responses:
 *       200:
 *         description: 회원 가입이 완료 되었습니다.
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: 사용자 로그인
 *     requestBody:  
 *       required: true
 *       content:
 *         application/json:  
 *           schema: 
 *             type: object
 *             properties:  
 *               email: {type: string}
 *               password: {type: string}
 *     responses:
 *       200:
 *         description: ${user.userName}님 환영합니다!
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                    token: {type: string}
 */

/**
 * @swagger
 * /api/users/logout:
 *   delete:
 *     summary: 사용자 로그아웃
 *     responses:
 *       200:
 *         description: 이용해주셔서 감사합니다.
 */

/**
 * @swagger
 * /api/users/findUser:
 *   get:
 *     summary: 사용자 찾기
 *     requestBody:  
 *       required: true
 *       content:
 *         application/json:  
 *           schema: 
 *             type: object
 *             properties:  
 *               email: {type: string}
 *               name: {type: string}
 *     responses:
 *       200:
 *         description: 임시 비밀번호를 이메일로 전송하였습니다.
 */

