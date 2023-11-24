const express = require('express');
const userRouter = require('./userRouter');
const lodgingRouter = require('./lodgingRouter');
const attractionRouter = require('./attractionRouter');
const airplaneRouter = require('./airplaneRouter');
const searchList = require('../services/searchList')
const router = express.Router();

router.use('/users', userRouter);
router.use('/lodgings', lodgingRouter);
router.use('/attractions', attractionRouter);
router.use('/airplane', airplaneRouter);
router.get('/search', searchList)
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
 *         description: 검색 키워드
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         example: attraction
 *         description: 검색할 유형
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: item
 *         schema:
 *           type: integer
 *         example: 1
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
 *                   {attractions: [
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
