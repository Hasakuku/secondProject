const express = require('express');
const lodgingController = require('../controllers/lodgingController')
const router = express.Router();

router.get('/search', lodgingController.lodgingsList) // 검색후 숙소 목록
router.get('/:lodgingId', lodgingController.getLodgingDetail) // 숙소 상세
router.get('/', lodgingController.getTopLodgings) // 인기 숙소

router.post('/order', lodgingController.createBooking) // 숙소 예약
router.put('/order', lodgingController.updateRoomBookingStatus) // 숙소 예약 상태 변경

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
 *                        address: { 
 *                          type: 'object',
 *                          properties: {
 *                            city: { type: 'string' },
 *                            county: { type: 'string' },
 *                            district: { type: 'string' },
 *                            detail: { type: 'string' },
 *                          }
 *                        }
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
 * @swagger
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
 *   post:
 *     summary: 숙소 등록
 *     responses:
 *       200:
 *          description: OK
 */

/**
 * @swagger
 * /api/lodgings/search:
 *   get:
 *     summary: 검색후 숙소 목록
 *     parameters:
 *       - in: query
 *         name: city
 *         schema: {type: string}
 *         example: 서울
 *         description: 특정 도시
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
 *                      "averageRating": 4.5}
 */
