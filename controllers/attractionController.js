const asynchandler = require('express-async-handler')
const attractionService = require('../services/attractionService')

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
const attractionController = { getTopAttractions, getAttractionDetail };
module.exports = attractionController