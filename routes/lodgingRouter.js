const express = require('express');
const lodgingController = require('../controllers/lodgingController')
const router = express.Router();

router.get('/search', lodgingController.lodgingsList) // 검색후 숙소 목록
router.get('/:lodgingId', lodgingController.getLodgingDetail) // 숙소 상세
router.get('/', lodgingController.getTopLodgings) // 인기 숙소
router.post('/', lodgingController.registerLodging) // 숙소 등록



module.exports = router;

/**
 * @swagger
 * /lodgings/{lodgingId}:
 *   get:
 *     summary: 숙소 상세
 *     parameters:
 *       - in: path
 *         name: lodgingId
 *         required: true
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
 * /lodgings:
 *   get:
 *     summary: 인기 숙소
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                         lodgingId: {type: number}
 *                         mainImage: {type: string}
 *                         avgRating: { type: number}
 *                         reviewCount: { type: number}
 *                         minPrice: { type: number}
 *   post:
 *     summary: 숙소 등록
 *     responses:
 *       200:
 *          description: OK
 */

/**
 * @swagger
 * /lodgings/search:
 *   get:
 *     summary: 검색후 숙소 목록
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
 */