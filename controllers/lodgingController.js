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
      locationId,
      checkInDate,
      checkOutDate,
      adults,
      children,
      level,
      page,
      item,
      sort,
   } = req.query;
   const result = await lodgingService.lodgingsList(
      Number(locationId),
      new Date(checkInDate),
      new Date(checkOutDate),
      Number(adults),
      Number(children),
      Number(level),
      Number(page),
      Number(item),
      sort,
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
   let lodgingId = 0;
   const { name, address } = req.body;

   const existingAttraction = await Lodging.findOne({ $or: [{ name }, { address }] });
   if (existingAttraction) {
      throw new BadRequestError('이름이나 주소가 동일한 숙소가 이미 존재합니다.');
   }
   const lodging = new Lodging({ ...req.body, lodgingId });
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