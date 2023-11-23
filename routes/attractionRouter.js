const express = require('express');
const attractionController= require('../controllers/attractionController')
const router = express.Router();

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
 *                         avgRating: { type: number}
 *                         reviewCount: { type: number}
 *                         name: { type: string}
 *                  example:
 *                     {
 *                      "attractionId": 2,
 *                      "name": "63빌딩",
 *                      "mainImage": "mainImage2.jpg",
 *                      "reviewCount": 2,
 *                       "avgRating": 4.5
 *                      }
 * 
 * 
 * 
 * 
 * 
 * 
 */
