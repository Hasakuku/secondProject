const asynchandler = require('express-async-handler')
const attractionService = require('../services/attractionService')

// 추천 여행지
const getTopAttractions = asynchandler(async (req, res) => {
   const city = req.params.city;
   const topAttractions = await attractionService.getTopAttractions(city);
   res.json(topAttractions);
})

const attractionController = { getTopAttractions, };
module.exports = attractionController