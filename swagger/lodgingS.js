/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - price
 *         - capacity
 *         - bedType
 *         - size
 *         - floor
 *       properties:
 *         name:
 *           type: string
 *           description: 객실 이름
 *         type:
 *           type: string
 *           description: 유형 
 *         price:
 *           type: number
 *           description: 1박 요금
 *         capacity:
 *           type: number
 *           description: 수용 가능 인원
 *         bedType:
 *           type: string
 *           description: 침대 유형 
 *         size:
 *           type: number
 *           description: 방의 크기
 *         floor:
 *           type: number
 *           description: 방이 위치한 층수
 *         amenities:
 *           type: array
 *           items:
 *             type: string
 *           description: 제공되는 편의 시설 
 *         status:
 *           type: boolean
 *           default: false
 *           description: 예약가능 여부
 *     Lodging:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - rooms
 *         - image
 *         - description
 *       properties:
 *         types:
 *           type: string
 *           enum: ['hotel', 'apart', 'motel', 'hostel', 'guestHouse']
 *           default: "hotel"
 *           description: 숙소 유형
 *         theme:
 *           type: string
 *           description: 숙소 테마
 *         name:
 *           type: string
 *           description: 숙소 이름
 *         address:
 *           type: string
 *           description: 숙소 주소
 *         rooms:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Room'
 *           description: 객실 목록
 *         map:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *               description: 위도
 *             longitude:
 *               type: number
 *               description: 경도
 *         option:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: 옵션의 카테고리 
 *               details:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: 옵션의 세부 사항 
 *         image:
 *           type: array
 *           items:
 *             type: string
 *           description: 이미지 URL
 *         description:
 *           type: string
 *           description: 설명
 *         review:
 *           type: array
 *           items:
 *             type: string
 *             format: objectId
 *             description: 호텔 리뷰
 */