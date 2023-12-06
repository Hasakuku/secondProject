const express = require('express');
const userRouter = require('./userRouter');
const userController = require('../controllers/userController')
const lodgingRouter = require('./lodgingRouter');
const attractionRouter = require('./attractionRouter');
const flightRouter = require('./flightRouter');
const orderRouter = require('./orderRouter')
const { searchList, locationList, createLocation } = require('../services/commonService');
const permission = require('../middlewares/permission');
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Just
 *   description: 
 */
/**
 * @swagger
 * tags:
 *   name: Default
 *   description: 
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 유저
 */
/**
 * @swagger
 * tags:
 *   name: Attractions
 *   description: 관광지
 */
/**
 * @swagger
 * tags:
 *   name: Lodgings
 *   description: 숙소
 */
/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: 예약
 */

router.use('/users', userRouter);
router.use('/lodgings', lodgingRouter);
router.use('/attractions', attractionRouter);
router.use('/flights', flightRouter);
router.use('/orders', orderRouter)

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.delete('/logout', userController.logout)
router.post('/findUser', userController.findUser)

router.get('/search', searchList)
router.get('/location', locationList)
router.post('/location', createLocation)
module.exports = router

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: 키워드를 사용하여 숙소과 관광지등 목록 검색
 *     tags: [Just]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         example: 서울
 *         description: "**검색 키워드**"
 *         required: true
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *         description: "**페이지 번호**"
 *         required: true
 *       - in: query
 *         name: item
 *         schema:
 *           type: integer
 *         example: 1
 *         description: "**반환할 항목 수**"
 *         required: true
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         example: attraction
 *         description: "**검색할 유형**\n\n-미입력시 모든 유형 반환"
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         example: review
 *         description: "**정렬기능**\n\n-미입력시 등록순으로 데이터 반환\n\n-리뷰수, 최저가격, 평균평점\n\n-[review, price, rating]"
 *     responses:
 *       200:
 *         description: 검색 결과를 성곡적으로 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lodgings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       lodgingId:
 *                         type: string
 *                       name:
 *                         type: string
 *                       mainImage:
 *                         type: string
 *                       avgRating:
 *                         type: number
 *                       reviewCount:
 *                         type: integer
 *                       location:
 *                         type: string
 *                       address:
 *                         type: object
 *                       minPrice:
 *                         type: number
 *                 attractions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       attractionId:
 *                         type: string
 *                       name:
 *                         type: string
 *                       mainImage:
 *                         type: string
 *                       avgRating:
 *                         type: number
 *                       reviewCount:
 *                         type: integer
 *                       address:
 *                         type: object
 *                       location:
 *                         type: string
 *             examples:
 *               lodgingsAndAttractions:
 *                 value:
 *                   {attractions: [
 *                     {
 *                       "attractionId": "1",
 *                       "name": "63빌딩",
 *                       "mainImage": "mainImage2.jpg",
 *                       "avgRating": 4.5,
 *                       "reviewCount": 2,
 *                       "map": {
 *                         "latitude": 37.2456,
 *                         "longitude": 125.4154},
 *                       "location": "65665b151f3d0e674c67474b",
 *                       "address":  "서울특별시 영등포구 여의도동 63로 50",
 *                       "country": "KR"
 *                     }
 *                   ]}
 */

/**
 * @swagger
 * /api/location:
 *   get:
 *     summary: 위치 목록 
 *     tags: [Just]
 *     parameters:
 *     responses:
 *       200:
 *         description: 위치 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *               example:
 *                 [
 *                    {
 *                       "map": {
 *                             "latitude": 37.5665,
 *                             "longitude": 126.978
 *                       },
 *                       "review": [],
 *                       "_id": "65665b151f3d0e674c67474b",
 *                       "locationId": 1,
 *                       "country": "대한민국",
 *                       "city": "서울",
 *                       "airport": "65665cdd65d9065a5de583d4",
 *                       "image": [
 *                             "image1"
 *                       ]
 *                    },
 *                    {
 *                       "map": {
 *                             "latitude": 37.4563,
 *                             "longitude": 126.7052
 *                       },
 *                       "review": [],
 *                      "_id": "65665b151f3d0e674c67474c",
 *                       "locationId": 2,
 *                       "country": "대한민국",
 *                       "city": "인천",
 *                       "airport": "65665cdd65d9065a5de583d5",
 *                       "image": [
 *                             "image2"
 *                       ]
 *                    },
 *                 ]
 */

/**
 * @swagger
 * /api/location:
 *   post:
 *     summary: 위치 등록
 *     tags: [Just]
 *     requestBody:
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                example:
 *                  {
 *                    "country": 6,
 *                    "city": "뉴욕",
 *                    "map": {
 *                       "latitude": 40.755701,
 *                       "longitude": -73.974201
 *                    },
 *                    "province": 뉴욕주,
 *                  }
 *     responses:
 *       200:
 *         description: 위치 등록 성공
 *         content:
 */

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: 사용자 등록
 *     tags: [Default]
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
 *               address:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *                 default: false
 *             required:  
 *               - email
 *               - userName
 *               - password
 *               - address
 *               - isAdmin
 *     responses:
 *       200:
 *         description: 회원 가입이 완료 되었습니다.
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: 사용자 로그인
 *     tags: [Default]
 *     requestBody:  
 *       required: true
 *       content:
 *         application/json:  
 *           schema: 
 *             type: object
 *             properties:  
 *               email: {type: string}
 *               password: {type: string}
 *             example:
 *               email: admin@test.com
 *               password: Aa1234!
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
 * /api/logout:
 *   delete:
 *     summary: 사용자 로그아웃
 *     tags: [Default]
 *     responses:
 *       200:
 *         description: 이용해주셔서 감사합니다.
 */

/**
 * @swagger
 * /api/findUser:
 *   post:
 *     summary: 사용자 찾기
 *     tags: [Default]
 *     requestBody:
 *       token: 
 *         type: string
 *       required: true
 *       content:
 *         application/json:  
 *           schema: 
 *             type: object
 *             properties:  
 *               email: {type: string}
 *               name: {type: string}
 *             example:
 *               {"email": "admin@test.com",
 *               "name": "admin"}
 *
 *     responses:
 *       200:
 *         description: 임시 비밀번호 발급
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 password: {type: string}
 *                 message: {type: string}
 *               example:
 *                 {"password": "7c40873a",
 *                 "message": "임시 비밀번호 발급완료"}
 */
