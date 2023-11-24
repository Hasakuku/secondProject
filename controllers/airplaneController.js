const asynchandler = require('express-async-handler')
const airplaneService = require('../services/airplaneService')

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
const airplaneController = { getTopAttractions, getAttractionDetail };

module.exports = airplaneController