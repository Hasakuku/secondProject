/**
 * @swagger
 * components:
 *   schemas:
 *     Ticket:
 *       type: object
 *       properties:
 *         adult:
 *           type: object
 *           required:
 *             - price
 *             - period
 *             - mandatoryTicket
 *           properties:
 *             price:
 *               type: string
 *               description: 가격
 *             period:
 *               type: string
 *               description: 유효기간
 *             mandatoryTicket:
 *               type: boolean
 *               default: true
 *               description: 입장권 수령 필수 여부
 *         youth:
 *           type: object
 *           required:
 *             - price
 *             - period
 *             - mandatoryTicket
 *           properties:
 *             price:
 *               type: string
 *               description: 가격
 *             period:
 *               type: string
 *               description: 유효기간
 *             mandatoryTicket:
 *               type: boolean
 *               default: true
 *               description: 입장권 수령 필수 여부
 *         child:
 *           type: object
 *           required:
 *             - price
 *             - period
 *             - mandatoryTicket
 *           properties:
 *             price:
 *               type: string
 *               description: 가격
 *             period:
 *               type: string
 *               description: 유효기간
 *             mandatoryTicket:
 *               type: boolean
 *               default: true
 *               description: 입장권 수령 필수 여부
 *     Destination:
 *       type: object
 *       required:
 *         - name
 *         - country
 *         - city
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: 여행지
 *         country:
 *           type: string
 *           description: 국가
 *         city:
 *           type: string
 *           description: 도시
 *         address:
 *           type: string
 *           description: 주소
 *         map:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *               description: 위도
 *             longitude:
 *               type: number
 *               description: 경도
 *         phoneNumber:
 *           type: string
 *           description: 전화번호
 *         description:
 *           type: string
 *           description: 설명
 *         image:
 *           type: array
 *           items:
 *             type: string
 *           description: 여행지 이미지 URL
 *         ticket:
 *           $ref: '#/components/schemas/Ticket'
 *           description: 입장권
 *         tourTime:
 *           type: number
 *           description: 추천 관광시간hour
 *         review:
 *           type: array
 *           items:
 *             type: string
 *             format: objectId
 *             description: 관광 리뷰
 */
