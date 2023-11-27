const asynchandler = require('express-async-handler')
const attractionService = require('../services/attractionService')
const AttractionReview = require('../models/attraction/attractionReviewModel')
// 추천 여행지
const getTopAttractions = asynchandler(async (req, res) => {
   const city = req.query.city;
   const topAttractions = await attractionService.getTopAttractions(city);
   res.json(topAttractions);
})

const getAttractionDetail = asynchandler(async (req, res) => {
   const attractionId = req.params.attractionId;
   const attractionDetail = await attractionService.getAttractionDetail(attractionId);
   res.json(attractionDetail);
})

const createReview = asynchandler(async (req, res) => {
   const data = req.body
   console.log(data)
   const review = new AttractionReview(data);
   await review.save();
})
const attractionController = { getTopAttractions, getAttractionDetail, createReview };
module.exports = attractionController