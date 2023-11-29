const asynchandler = require('express-async-handler')
const attractionService = require('../services/attractionService')
const AttractionReview = require('../models/attraction/attractionReview')
// 추천 여행지
const getTopAttractions = asynchandler(async (req, res) => {
   const city = req.query.city;
   const topAttractions = await attractionService.getTopAttractions(city);
   res.status(200).json(topAttractions);
})

// 관광지 상세
const getAttractionDetail = asynchandler(async (req, res) => {
   const attractionId = req.params.attractionId;
   const attractionDetail = await attractionService.getAttractionDetail(attractionId);
   res.status(200).json(attractionDetail);
})

// 관광지 리뷰 생성
const createReview = asynchandler(async (req, res) => {
   const data = req.body
   const review = await attractionService.createReview(data);
  res.status(201).json({message: '리뷰가 등록 되었습니다.'})
})
const attractionController = { getTopAttractions, getAttractionDetail, createReview };
module.exports = attractionController