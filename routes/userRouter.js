const express = require('express');
const userController= require('../controllers/userController')
const router = express.Router();

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.delete('/logout', userController.logout)
router.get('/findId', userController.findUser)

module.exports = router;

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: 사용자 등록
 *     responses:
 *       200:
 *         description: 
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: 사용자 로그인
 *     responses:
 *       200:
 *         description: 
 */

/**
 * @swagger
 * /users/logout:
 *   delete:
 *     summary: 사용자 로그아웃
 *     responses:
 *       200:
 *         description: 
 */

/**
 * @swagger
 * /users/findUser:
 *   get:
 *     summary: 사용자 찾기
 *     responses:
 *       200:
 *         description: 
 */
