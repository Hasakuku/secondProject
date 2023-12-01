const express = require('express');
const lodgingController = require('../controllers/lodgingController')
const { createReview } = require('../services/commonService')
const permission = require('../middlewares/permission')
const router = express.Router();

router.get('/search', lodgingController.lodgingsList) // 검색후 숙소 목록
router.get('/:lodgingId', lodgingController.getLodgingDetail) // 숙소 상세
router.get('/', lodgingController.getTopLodgings) // 인기 숙소

// router.post('/order', lodgingController.createBooking) // 숙소 예약
// router.put('/order', lodgingController.updateRoomBookingStatus) // 숙소 예약 상태 변경

router.post('/review', permission('user'), createReview)

router.post('/', lodgingController.registerLodging) // 숙소 등록




module.exports = router;

/**
 * @swagger
 * /api/lodgings/{lodgingId}:
 *   get:
 *     summary: 숙소 상세
 *     parameters:
 *       - in: path
 *         name: lodgingId
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
 *                    lodging:
 *                      type: object
 *                      properties:
 *                        lodgingId: { type: 'integer' }
 *                        attraction: { type: 'string' }
 *                        types: { type: 'string' }
 *                        level: { type: 'integer' }
 *                        theme: { type: 'array', items: { type: 'string' } }
 *                        name: { type: 'string' }
 *                        location: {type: 'string' }
 *                        address: {type: 'string'}
 *                        rooms: { type: 'array', items: { type: 'string' } }
 *                        map: { 
 *                          type: 'object',
 *                          properties: {
 *                            latitude: { type: 'number' },
 *                            longitude: { type: 'number' },
 *                          }
 *                        }
 *                        option: { 
 *                          type: 'array',
 *                          items: { 
 *                            type: 'object',
 *                            properties: {
 *                              category: { type: 'string' },
 *                              details: { type: 'array', items: { type: 'string' } }
 *                            }
 *                          }
 *                        }
 *                        image: { type: 'array', items: { type: 'string' } }
 *                        mainImage: { type: 'string' }
 *                        description: { type: 'string' }
 *                        review: { type: 'array', items: { type: 'string' } }
 *                    roomType:
 *                      type: object
 *                      properties:
 *                        name: { type: 'integer' }
 *                        types: { type: 'string' }
 *                        bedType: { type: 'string' }
 *                        price: { type: 'integer' }
 *                        capacity: { type: 'integer' }
 *                        size: { type: 'integer' }
 *                        image: { type: 'array', items: { type: 'string' } }
 *                        amenities: { type: 'array', items: { type: 'string' } }
 */


/**
 * 
 * /api/lodgings:
 *   get:
 *     summary: 인기 숙소
 *     parameters:
 *       - in: query
 *         name: city
 *         schema: {type: string}
 *         example: 서울
 *         description: 특정 도시
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                         lodgingId: {type: number}
 *                         name: {type: string}
 *                         mainImage: {type: string}
 *                         avgRating: { type: number}
 *                         reviewCount: { type: number}
 *                         minPrice: { type: number}
 *                  example:
 *                     {lodgingId: 1,
 *                      name: 호텔1,
 *                       mainImage: mainImage.jpg,
 *                       avgRating: 4.5,
 *                       reviewCount: 2,
 *                       minPrice: 100000}
 */

/**
 * @swagger
 * /api/lodgings:
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
 *                    "attraction": "605c17c4b392053daaa3c9a6",
 *                    "types": "hotel",
 *                    "level": 5,
 *                    "theme": ["온천호텔", "야경 명소"],
 *                    "name": "롯데호텔",
 *                    "location": "605c17c4b392053daaa3c9a7",
 *                    "address": "서울특별시 중구 을지로 30",
 *                    "rooms": ["605c17c4b392053daaa3c9a8", "605c17c4b392053daaa3c9a9"],
 *                    "map": {
 *                       "latitude": 37.5650172,
 *                       "longitude": 126.9782914
 *                    },
 *                    "option": [
 *                       {
 *                          "category": "프론트서비스",
 *                          "details": ["벨멘", "24시간서비스"]
 *                       }
 *                    ],
 *                    "image": ["image1.jpg", "image2.jpg", "image3.jpg"],
 *                    "mainImage": "mainImage.jpg",
 *                    "description": "롯데호텔은 서울 중심부에 위치하고 있으며, 최고의 서비스를 제공합니다.",
 *                    "review": ["605c17c4b392053daaa3c9aa", "605c17c4b392053daaa3c9ab"]
 *                  }
 *     responses:
 *       200:
 *         description: 숙소 등록 성공
 *         content:
 */

/**
 * @swagger
 * /api/lodgings/search:
 *   get:
 *     summary: 조건 검색후 목록
 *     parameters:
 *       - in: query
 *         name: locationId
 *         schema: {type: integer}
 *         example: 1
 *         description: locationID
 *         required: true
 *       - in: query
 *         name: checkInDate
 *         schema: {type: string}
 *         example: 2023-11-22
 *         description: 체크인 날짜
 *         required: true
 *       - in: query
 *         name: checkOutDate
 *         schema: {type: string}
 *         example: 2023-11-23
 *         description: 체크아웃 날짜
 *         required: true
 *       - in: query
 *         name: adults
 *         schema: {type: number}
 *         example: 1
 *         description: 성인 수
 *         required: true
 *       - in: query
 *         name: children
 *         schema: {type: number}
 *         example: 0
 *         description: 어린이 수
 *       - in: query
 *         name: level
 *         schema: {type: string}
 *         example: 5
 *         description: 호텔 성급
 *       - in: query
 *         name: page
 *         schema: {type: number}
 *         example: 1
 *         description: 페이지 번호
 *         required: true
 *       - in: query
 *         name: item
 *         schema: {type: number}
 *         example: 20
 *         description: 아이템 수
 *         required: true
 *         
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                          lodgingId: { type: 'number' }
 *                          hotelName: { type: 'string' }
 *                          mainImage: { type: 'string' }
 *                          reviewCount: { type: 'number' }
 *                          averageRating: { type: 'number' }
 *                  example:
 *                     {"lodgingId": 1,
 *                      "hotelName": "호텔1",
 *                      "mainImage": "mainImage.jpg",
 *                      "reviewCount": 2,
 *                      "theme": ["야경명소", "온천 호텔"],
 *                      "averageRating": 4.5}
 */

/**
 * @swagger
 * /api/lodgings/review:
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
 *                 "lodging": "605c17c4b392053daaa3c9a7",
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
 * /api/orders:
 *   post:
 *     summary: 숙소 예약 생성
 *     requestBody:
 *       token: 
 *         type: string
 *       required: true
 *       content:
 *         application/json:  
 *           schema: 
 *             type: object
 *             properties:
 *             example:
 *               {
 *                 "roomBookingId": 3,
 *                 "user": "6567aac0910622e34444b351",
 *                 "firstName": "wonsik",
 *                 "lastName": "seo",
 *                 "email":"test@test.com",
 *                 "phoneNumber": "010-1111-1111",
 *                 "room": "655d96451116b641aa22f786",
 *                 "status": false,
 *                 "checkInDate": "2023-12-14",
 *                 "checkOutDate": "2023-12-15",
 *                 "adults": 1,
 *                 "children": 0,
 *                 "request": "솔로"
 *               }
 *
 *     responses:
 *       201:
 *         description: 예약이 등록되었습니다.
 *         content:
 */

/**
 * @swagger
 * /api/orders:
 *   put:
 *     summary: 예약 상태 수정
 *     requestBody:
 *       token: 
 *         type: string
 *       required: true
 *       content:
 *         application/json:  
 *           schema: 
 *             type: object
 *             properties:
 *             example:
 *               {
 *                 "roomBookingId": 3,
 *                 "status": false,
 *               }
 *
 *     responses:
 *       201:
 *         description: 예약이 수정되었습니다.
 *         content:
 */