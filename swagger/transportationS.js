/**
 * @swagger
 * components:
 *   schemas:
 *     Transportation:
 *       type: object
 *       required:
 *         - types
 *         - origin
 *         - destination
 *         - departureDate
 *         - arrivalDate
 *       properties:
 *         types:
 *           type: string
 *           enum: ['airplane', 'train', 'car']
 *           description: 교통 수단 유형
 *         origin:
 *           type: string
 *           description: 출발지
 *         destination:
 *           type: string
 *           description: 도착지
 *         departureDate:
 *           type: string
 *           format: date
 *           description: 출발 날짜
 *         arrivalDate:
 *           type: string
 *           format: date
 *           description: 도착 날짜
 */