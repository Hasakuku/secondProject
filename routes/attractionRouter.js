const express = require('express');
const attractionController= require('../controllers/attractionController')
const { createReview } = require('../services/commonService')
const permission = require('../middlewares/permission')
const router = express.Router();

router.get('/:attractionId', attractionController.getAttractionDetail) // 관광지 상세
// router.get('/', attractionController.getTopAttractions)
router.post('/review', permission('user'), createReview)
router.post('/', attractionController.registerAttraction)

module.exports = router;

/**
 * 
 * /api/attractions:
 *   get:
 *     summary: 추천 관광지
 *     parameters:
 *     - in: query
 *       name: city
 *       schema: {type: string}
 *       example: "서울"
 *       description: 도시
 *       required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                         attractionId: {type: number}
 *                         mainImage: {type: string}
 *                         country: {type: string}
 *                         avgRating: { type: number}
 *                         reviewCount: { type: number}
 *                         name: { type: string}
 *                  example:
 *                     {
 *                      "attractionId": 2,
 *                      "country": "KR",
 *                      "name": "63빌딩",
 *                      "mainImage": "mainImage2.jpg",
 *                      "reviewCount": 2,
 *                       "avgRating": 4.5
 *                      }
 */

/**
 * @swagger
 * /api/attractions/{attractionId}:
 *   get:
 *     summary: 관광지 상세
 *     parameters:
 *       - in: path
 *         name: attractionId
 *         required: true
 *         example: 1
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                    attractionId:
 *                      type: number
 *                      description: 관광지 ID
 *                    lodging:
 *                      type: string
 *                      description: 근처 숙소
 *                    types:
 *                      type: string
 *                      enum: ['activity', 'landmark']
 *                      description: 관광지 유형
 *                    name:
 *                      type: string
 *                      description: 관광지 이름
 *                    location:
 *                      type: string
 *                      description: 위치 정보
 *                    address:
 *                      type: string
 *                      description: 주소
 *                    map:
 *                      type: object
 *                      properties:
 *                        latitude:
 *                          type: number
 *                        longitude:
 *                          type: number
 *                    theme:
 *                      type: string
 *                    phoneNumber:
 *                      type: string
 *                    description:
 *                      type: string
 *                    image:
 *                      type: array
 *                      items:
 *                        type: string
 *                    mainImage:
 *                      type: string
 *                    ticket:
 *                      $ref: '#/components/schemas/Ticket'
 *                    operatingTime:
 *                      type: object
 *                      properties:
 *                        open:
 *                          type: string
 *                        close:
 *                          type: string
 *                    recommendTourTime:
 *                      type: number
 *                    review:
 *                      type: array
 *                      items:
 *                        type: string
 */

/**
 * @swagger
 * /api/attractions/review:
 *   post:
 *     summary: 리뷰 생성
 *     requestBody:
 *       token: 
 *         type: string
 *       required: true
 *       content:
 *         application/json:  
 *           schema: 
 *             type: object
 *             properties:
 *               types:
 *                 type: string
 *               user:
 *                 type: string
 *               lodging:
 *                 type: string
 *               attraction:
 *                 type: string
 *               content:
 *                 type: string
 *               rating:
 *                 type: string
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               {
 *                 "types": "lodging",
 *                 "user": "605c17c4b392053daaa3c9a6",
 *                 "attraction": "605c17c4b392053daaa3c9a7",
 *                 "content": "이 호텔은 정말 훌륭했습니다. 서비스도 좋고, 방도 깨끗했습니다. 다음에도 이용하고 싶습니다.",
 *                 "rating": 1,         
 *                 "image": ["image1.jpg", "image2.jpg"]
 *                 }
 *
 *     responses:
 *       201:
 *         description: 리뷰 생성 성공
 *         content:
 */

/**
 * @swagger
 * /api/attractions:
 *   post:
 *     summary: 숙소 등록
 *     requestBody:
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                example:
 *                  {
 *                    "attractionId": 6,
 *                    "lodging": "60d21b86b31de2d418296a80",
 *                    "types": "activity",
 *                    "name": "부산 아쿠아리움",
 *                    "location": {
 *                       "$oid": "65665b151f3d0e674c67474f"
 *                    },
 *                    "address": "부산",
 *                    "map": {
 *                       "latitude": 37.5131,
 *                       "longitude": 127.059
 *                    },
 *                    "theme": [
 *                       "부산 명소",
 *                       "어린이 테마 파크"
 *                    ],
 *                    "phoneNumber": "02-6002-6200",
 *                    "description": "코엑스 아쿠아리움은 다양한 수중 생물을 볼 수 있는 아쿠아리움입니다.",
 *                    "image": [
 *                       "b1.jpeg",
 *                       "b2.jpeg",
 *                       "b3.jpeg"
 *                    ],
 *                    "mainImage": "bMain.jpeg",
 *                    "ticket": {
 *                       "adult": {
 *                          "price": 28000,
 *                          "period": "1day",
 *                          "mandatoryTicket": true
 *                       },
 *                       "youth": {
 *                          "price": 25000,
 *                          "period": "1day",
 *                          "mandatoryTicket": true
 *                       },
 *                       "child": {
 *                          "price": 22000,
 *                          "period": "1day",
 *                          "mandatoryTicket": true
 *                       }
 *                    },
 *                    "operatingTime": {
 *                       "open": "10:00",
 *                       "close": "20:00"
 *                    },
 *                    "recommendTourTime": 3,
 *                    "review": [
 *                       {
 *                          "$oid": "6566801754450d587f91182e"
 *                       },
 *                       {
 *                          "$oid": "6566816223e06c5b72b3c7a4"
 *                       }
 *                    ]
 *                    }
 *     responses:
 *       200:
 *         description: 숙소 등록 성공
 *         content:
 */