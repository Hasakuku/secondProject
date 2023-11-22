const asynchandler = require('express-async-handler')
const attractionService = require('../services/attractionService')

// 추천 여행지
const getTopAttractions = asynchandler(async (req, res) => {
   const city = req.query.city;
   const topAttractions = await attractionService.getTopAttractions(city);
   res.json(topAttractions);
})

const a = asynchandler(async (req, res) => {
   const city = req.params.city;
   const topAttractions = await attractionService.getTopAttractions(city);
   res.json(topAttractions);
})
const attractionController = { getTopAttractions, a };
module.exports = attractionController