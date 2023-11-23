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
module.exports = router;
/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: 키워드를 사용하여 숙소와 관광지를 검색
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         example: 서울
 *         description: 검색할 키워드 
 *       - in: query
 *         name: item
 *         schema:
 *           type: integer
 *         example: 4
 *         description: 반환할 항목의 수
 *     responses:
 *       200:
 *         description: 검색 결과를 성공적으로 반환했습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   lodgingId:
 *                     type: string
 *                   name:
 *                     type: string
 *                   mainImage:
 *                     type: string
 *                   avgRating:
 *                     type: number
 *                   reviewCount:
 *                     type: integer
 *                   country:
 *                     type: string
 *                   address:
 *                     type: object
 *                   minPrice:
 *                     type: number
 *                   attractionId:
 *                     type: string
 *                 example:
 *                     {lodgingId: 1,
 *                      name: 호텔1,
 *                       mainImage: mainImage.jpg,
 *                       avgRating: 4.5,
 *                       reviewCount: 2,
 *                       country: KR,
 *                          address: {
 *                          city: 서울,
 *                          county: 강남구,
 *                          district: 삼성동,
 *                          detail: 테헤란로 123
 *                          },
 *                       minPrice: 100000}
 */