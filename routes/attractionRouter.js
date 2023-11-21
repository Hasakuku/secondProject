const express = require('express');
const attractionController= require('../controllers/attractionController')
const router = express.Router();

router.get('/:city', attractionController.getTopAttractions)

module.exports = router;

/**
 * @swagger
 * /attractions/login:
 *   post:
 *     summary: 추천 관광지
 *     responses:
 *       200:
 *         description: 
 */
