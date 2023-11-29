const mongoose = require("mongoose");
const { Schema } = mongoose

const orderSchema = new Schema({
	user: { // 예약자
		type: Schema.Types.ObjectId, // 회원 정보 
		ref: 'User',
		name: { type: String, required: true }, // 예약자 이름
		email: { type: String, required: true }, // 예약자 이메일
		phoneNumber: { type: String, required: true }, // 예약자 전화번호
		request: { type: String, }, // 요청사항
	},
	types: { // 예약 유형
		type: String,
		enum: ['airplane', 'train', 'car', 'room', 'attraction'],
		required: true,
	},
	typesId: { // 예약한 상품 ID
		type: Schema.Types.ObjectId,
		refPath: 'types',
		required: true,
	},
	payment: { // 결제 정보
		status: { // 결제 상태
			type: String,
			enum: ['READY', 'SENT', 'SUCCESS', 'CANCELLED', 'FAILED'],
			default: 'READY'
		},
		kakaopayId: { type: String, required: true }, // 카카오페이 거래 ID
	},
}, {
	timestamps: true
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order;

/**
 * 
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - orderId
 *         - user
 *         - types
 *         - typesId
 *         - payment
 *       properties:
 *         orderId:
 *           type: number
 *           description: 주문 ID
 *         user:
 *           type: object
 *           required:
 *             - type
 *             - name
 *             - email
 *             - phoneNumber
 *           properties:
 *             type:
 *               type: string
 *               description: 회원 정보
 *             name:
 *               type: string
 *               description: 예약자 이름
 *             email:
 *               type: string
 *               description: 예약자 이메일
 *             phoneNumber:
 *               type: string
 *               description: 예약자 전화번호
 *             request:
 *               type: string
 *               description: 요청사항
 *         types:
 *           type: string
 *           enum: ['airplane', 'train', 'car', 'room', 'attraction']
 *           description: 예약 유형
 *         typesId:
 *           type: string
 *           description: 예약한 상품 ID
 *         payment:
 *           type: object
 *           required:
 *             - status
 *             - kakaopayId
 *           properties:
 *             status:
 *               type: string
 *               enum: ['READY', 'SENT', 'SUCCESS', 'CANCELLED', 'FAILED']
 *               default: 'READY'
 *               description: 결제 상태
 *             kakaopayId:
 *               type: string
 *               description: 카카오페이 거래 ID
 */
