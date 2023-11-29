const express = require('express');
const userRouter = require('./userRouter');
const lodgingRouter = require('./lodgingRouter');
const attractionRouter = require('./attractionRouter');
const flightRouter = require('./flightRouter');
const { searchList, createReview, getUserReview, locationList } = require('../services/commonService')
const router = express.Router();

router.use('/users', userRouter);
router.use('/lodgings', lodgingRouter);
router.use('/attractions', attractionRouter);
router.use('/flights', flightRouter);

router.get('/search', searchList)
router.get('/location', locationList)

router.post('/review', createReview)
router.get('/review', getUserReview)
module.exports = router

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: 키워드를 사용하여 숙소과 관광지등 목록 검색
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
 *                       country:
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
 *                       country:
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
 *                       "address": {
 *                         "city": "서울특별시",
 *                         "county": "영등포구",
 *                         "district": "여의도동",
 *                         "detail": "63로 50"
 *                       },
 *                       "country": "KR"
 *                     }
 *                   ]}
 */

/**
 * @swagger
 * /api/location:
 *   get:
 *     summary: 위치 목록 
 *     parameters:
 *     responses:
 *       200:
 *         description: 위치 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 locationId:
 *                   type: number
 *                   description: 위치 ID
 *                 country:
 *                   type: string
 *                   description: 국가 이름
 *                 province:
 *                   type: string
 *                   description: 지방 이름
 *                 city:
 *                   type: string
 *                   description: 도시 이름
 *                 map:
 *                   type: object
 *                   properties:
 *                     latitude:
 *                       type: number
 *                       description: 위도
 *                     longitude:
 *                       type: number
 *                       description: 경도
 *                 airport:
 *                   type: string
 *                   format: ObjectId
 *                   description: 공항 ID
 *                 description:
 *                   type: string
 *                   description: 위치 설명
 *                 image:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: 이미지 URL 리스트
 *                 review:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: 리뷰 리스트
 *               example:
 *                 {"map": {
 *                  "latitude": 37.5665,
 *                  "longitude": 126.978
 *                   },
 *                  "image": [],
 *                  "_id": "65665b151f3d0e674c67474b",
 *                  "locationId": 1,
 *                  "country": "대한민국",
 *                  "city": "서울",
 *                  "airport": "65665cdd65d9065a5de583d4"}
 */

