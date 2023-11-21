const express = require('express');
const lodgingController = require('../controllers/lodgingController')
const router = express.Router();

router.get('/:lodgingId', lodgingController.getLodgingDetail) // 숙소 상세
router.get('/', lodgingController.getTopLodgings) // 인기 숙소
router.post('/', lodgingController.registerLodging) // 숙등록
router.get('/list', lodgingController.lodgingsList) // 검색후 숙소 목록


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
 *           type: string
 *     responses:
 *       200:
 *         description: 
 */

/**
 * @swagger
 * /lodgings:
 *   get:
 *     summary: 인기 숙소
 *     responses:
 *       200:
 *         description: 
 *   post:
 *     summary: 숙소 등록
 *     responses:
 *       200:
 *         description: 
 */

/**
 * @swagger
 * /lodgings/list:
 *   get:
 *     summary: 검색후 숙소 목록
 *     responses:
 *       200:
 *         description: 
 */
