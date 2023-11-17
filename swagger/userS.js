/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - name
 *       properties:
 *         email:
 *           type: string
 *           description: 이메일
 *         password:
 *           type: string
 *           description: 비밀번호
 *         name:
 *           type: string
 *           description: 이름
 *         phoneNumber:
 *           type: string
 *           description: 전화번호
 *         favorites:
 *           type: array
 *           items:
 *             type: string
 *           description: 즐겨찾기
 *         level:
 *           type: string
 *           enum: ['silver', 'gold', 'platinum', 'diamond']
 *           default: "silver"
 *           description: 사용자의 등급
 *         isAdmin:
 *           type: boolean
 *           default: false
 *           description: 관리자인지 여부
 *         deleteAt:
 *           type: string
 *           format: date-time
 *           default: null
 *           description: 계정 삭제 시간
 */