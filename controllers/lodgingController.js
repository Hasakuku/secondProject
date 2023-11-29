const asyncHandler = require('express-async-handler');
const lodgingService = require('../services/lodgingService')
const Lodging = require('../models/lodging/lodging')
const { InternalServerError } = require('../utils/customError')
const RoomBooking = require('../models/lodging/roomBooking');
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

// 예약 생성
const createBooking = asyncHandler(async (req, res) => {
   const order = req.body
   const newRoomBooking = await lodgingService.createBooking(order)
   await newRoomBooking.save();
   res.status(201).json({ message: '예약이 등록되었습니다.' });
})

//예약 상태 수정
const updateRoomBookingStatus = asyncHandler(async (req, res) => {
   const updateStatus = req.body;
   const result = await lodgingService.updateRoomBookingStatus(updateStatus);
   res.status(201).json({ message: '예약 상태가 수정되었습니다.' });
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