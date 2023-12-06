const asyncHandler = require('express-async-handler');
const orderService = require('../services/orderService')
const Lodging = require('../models/lodging/lodging')
const { InternalServerError } = require('../utils/customError')
const RoomBooking = require('../models/lodging/roomBooking');

// 예약 생성
const createBooking = asyncHandler(async (req, res) => {
   let roomBookingId;
   const user = req.user
   const order = {...req.body, roomBookingId}
   const newRoomBooking = await orderService.createBooking(user,order)
   // await newRoomBooking.save();
   res.status(201).json({ message: '예약이 등록되었습니다.' });
})

//예약 상태 수정
const updateRoomBookingStatus = asyncHandler(async (req, res) => {
   const user = req.user
   const updateStatus = req.body;
   const result = await orderService.updateRoomBookingStatus(user,updateStatus);
   res.status(201).json({ message: '예약 상태가 수정되었습니다.' });
})

//유저 예약 목록
const getUserBookings = asyncHandler(async (req, res) => {
   const userId = req.query.userId;
   const result = await orderService.getUserBookings(userId);
   res.status(200).json(result);
})

const orderController = { createBooking, updateRoomBookingStatus, getUserBookings }
module.exports = orderController;