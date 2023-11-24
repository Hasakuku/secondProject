const express = require('express');
const attractionController= require('../controllers/attractionController')
const router = express.Router();

router.get('/:attractionId', attractionController.getAttractionDetail)
router.get('/', attractionController.getTopAttractions)

module.exports = router;

/**
 * @swagger
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
 *     summary: 숙소 상세
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
 *                    country:
 *                      type: string
 *                      description: 국가
 *                    address:
 *                      type: object
 *                      properties:
 *                        city:
 *                          type: string
 *                        county:
 *                          type: string
 *                        district:
 *                          type: string
 *                        detail:
 *                          type: string
 *                    map:
 *                      type: object
 *                      properties:
 *                        latitude:
 *                          type: number
 *                        longitude:
 *                          type: number
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

