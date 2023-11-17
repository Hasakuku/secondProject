/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       required:
 *         - userId
 *         - hotel
 *         - checkInDate
 *         - checkOutDate
 *         - status
 *       properties:
 *         userId:
 *           type: string
 *           format: objectId
 *           description: 예약자 ID
 *         hotel:
 *           type: string
 *           format: objectId
 *           description: 예약한 호텔 ID
 *         transportation:
 *           type: string
 *           format: objectId
 *           description: 선택한 교통 수단의 ID
 *         checkInDate:
 *           type: string
 *           format: date
 *           description: 체크인 날짜
 *         checkOutDate:
 *           type: string
 *           format: date
 *           description: 체크아웃 날짜
 *         status:
 *           type: string
 *           enum: ['confirmed', 'waiting', 'cancelled']
 *           description: 예약 상태
 */