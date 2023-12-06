const express = require('express');
const orderController = require('../controllers/orderController')
const permission = require('../middlewares/permission')
const router = express.Router();

router.get('/', permission('user'), orderController.getUserBookings)
// router.get('/', orderController.getUserBookings)
router.post('/', orderController.createBooking)
router.put('/', orderController.updateRoomBookingStatus)

module.exports = router;

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: 숙소 예약 생성
 *     tags: [Orders]
 *     parameters:
 *       - in: query
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
 *                 "lodging": "655d93d91116b641aa22f75a",
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
 *     tags: [Orders]
 * 
 *     requestBody:
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

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: 유저 숙소 예약 목록
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       userId: 
 *         type: Number
 *       required: true
 *       content:
 *         application/json:  
 *           schema: 
 *             type: object
 *             properties:
 *             
 *
 *     responses:
 *       201:
 *         description: 예약이 등록되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *               example:
 *                 {
 *                   "roomBookingId": 3,
 *                   "user": "656e9d40937e20e2e4de7d61",
 *                   "firstName": "wonsik",
 *                   "lastName": "seo",
 *                   "email":"test@test.com",
 *                   "phoneNumber": "010-1111-1111",
 *                   "room": "655d96451116b641aa22f786",
 *                   "status": false,
 *                   "checkInDate": "2023-12-14",
 *                   "checkOutDate": "2023-12-15",
 *                   "adults": 1,
 *                   "children": 0,
 *                   "request": "솔로"
 *                 }
 */

// *     parameters:
// *       - in: query
// *         name: roomBookingId
// *         schema: {type: integer}
// *         example: 3
// *         description: roomBookingId
// *         required: true