const express = require('express');
const userRouter = require('./userRouter');
const lodgingRouter = require('./lodgingRouter');
const attractionRouter = require('./attractionRouter');
const searchList = require('../services/searchList')
const router = express.Router();

router.use('/users', userRouter);
router.use('/lodgings', lodgingRouter);
router.use('/attractions', attractionRouter);
router.get('/search', searchList)
module.exports = router
/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: 키워드를 사용하여 숙소과 관광지 검색
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         example: 서울
 *         description: 검색 키워드
 *       - in: query
 *         name: item
 *         schema:
 *           type: integer
 *         example: 4
 *         description: 반환할 항목 수
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
 *                   {lodgings: [{
 *                       "lodgingId": "1",
 *                       "name": "호텔1",
 *                       "mainImage": "mainImage.jpg",
 *                       "avgRating": 4.5,
 *                       "reviewCount": 2,
 *                       "country": "KR",
 *                       "address": {
 *                         "city": "서울",
 *                         "county": "강남구",
 *                         "district": "삼성동",
 *                         "detail": "테헤란로 123"
 *                       },
 *                       "minPrice": 100000
 *                     }
 *                   ],
 *                   attractions: [
 *                     {
 *                       "attractionId": "1",
 *                       "name": "63빌딩",
 *                       "mainImage": "mainImage2.jpg",
 *                       "avgRating": 4.5,
 *                       "reviewCount": 2,
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
