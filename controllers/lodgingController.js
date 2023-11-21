const asyncHandler = require('express-async-handler');
const lodgingService = require('../services/lodgingService')
const Lodging = require('../models/lodgingModel')
const { InternalServerError } = require('../utils/customError')

//인기 호텔 도시별 숙소 목록(4개)
const getTopLodgings = asyncHandler(async (req, res) => {
   const lodgings = await lodgingService.getTopLodgings();
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
   } = req.query;
   const result = await lodgingService.lodgingsList(
      city,
      new Date(checkInDate),
      new Date(checkOutDate),
      Number(adults),
      Number(children),
      Number(level),
      Number(page),
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


const lodgingController = {
   getTopLodgings,
   lodgingsList,
   registerLodging,
   getLodgingDetail,
}
module.exports = lodgingController;