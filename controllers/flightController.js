const asynchandler = require('express-async-handler')
const flightService = require('../services/flightService')

// 조건 설정후 항공편 검색
const searchList = asynchandler(async (req,res) => {
   const data= req.query;
   const results = await flightService.searchList(data)
   res.status(200).json(results)
})

// 항공편 생성
const createFlight = asynchandler(async (req, res) => {
   const data = req.body;
   const result = await flightService.createFlight(data);
   res.status(201).json({ message: "항공편이 생성 되었습니다." })
})

// 항공편 예약 생성
const createBooking = asynchandler(async (req, res) => {
   const data = req.body;
   await flightService.createBooking(data);
   res.status(201).json({ message: "항공편 예약이 등록되었습니다." })
})
const flightController = { createFlight, createBooking, searchList };

module.exports = flightController