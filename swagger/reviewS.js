/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - user
 *         - content
 *         - rating
 *       properties:
 *         user:
 *           type: string
 *           format: objectId
 *           description: 리뷰를 작성한 사용자의 ID
 *         content:
 *           type: string
 *           description: 리뷰 내용
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           description: 별점 (1에서 5까지)
 *         image:
 *           type: string
 *           description: 이미지 URL
 *         createdAt:
 *           type: string
 *           format: date-time
 *           default: "현재 시간"
 *           description: 리뷰가 작성된 날짜
 */