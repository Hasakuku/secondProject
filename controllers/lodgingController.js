const asyncHandler = require('express-async-handler');
const lodgingService = require('../services/lodgingService')
const Lodging = require('../models/lodging/lodgingModel')
const { InternalServerError } = require('../utils/customError')
const RoomBooking = require('../models/lodging/roomBookingModel');
//인기 호텔 도시별 숙소 목록(4개)
const getTopLodgings = asyncHandler(async (req, res) => {
   const city = req.query.city
   const lodgings = await lodgingService.getTopLodgings(city);
   res.json(lodgings);
});

// 숙소검색 -> 숙소 목록 데이터(20개)
const lodgingsList = asyncHandler(async (req, res) => {
   const {
      city,
      checkInDate,
      checkOutDate,
      adults,
      children,
      level,
      page,
      item,
   } = req.query;
   const result = await lodgingService.lodgingsList(
      city,
      new Date(checkInDate),
      new Date(checkOutDate),
      Number(adults),
      Number(children),
      Number(level),
      Number(page),
      Number(item),
   );
   res.json(result);
});

// 숙소 상세페이지
const getLodgingDetail = asyncHandler(async (req, res) => {
   const lodgingId = req.params.lodgingId;
   if (!lodgingId) {
      throw new BadRequestError('올바른 요청이 아닙니다.');
   }
   const result = await lodgingService.getLodgingDetail(lodgingId)
   res.json(result);
})

// 호텔 등록
const registerLodging = asyncHandler(async (req, res) => {
   const lodging = new Lodging(req.body);
   await lodging.save();
   res.status(201).json({ message: '숙소가 성공적으로 등록되었습니다.' });
})

// 예약
const createBooking = asyncHandler(async (req, res) => {
   const newRoomBooking = new RoomBooking({
      user: "6551b296421c13b08b19fdf3",
      room: "655d96451116b641aa22f786",
      roomBookingpo: 1,
      status: false,
      checkInDate: new Date(2023, 11, 27),
      checkOutDate: new Date(2023, 11, 30),
      adults: 2,
      children: 1,
      bookingStatus: 'waiting'
   });
   if (!newRoomBooking) throw new Error('error')
   // Room 인스턴스를 데이터베이스에 저장합니다.
   await newRoomBooking.save();
   res.status(201).json({ message: '예약이 들어왔습니다.' });
})

//
const updateRoomBookingStatus = asyncHandler(async (req, res) => {
   const a = req.body;
   await lodgingService.updateRoomBookingStatus(a);
   res.status(201).json({ message: '예약이 수정되었습니다.' });
})


const lodgingController = {
   getTopLodgings,
   lodgingsList,
   registerLodging,
   getLodgingDetail,
   createBooking,
   updateRoomBookingStatus,
}
module.exports = lodgingController;