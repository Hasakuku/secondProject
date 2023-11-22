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
 */
