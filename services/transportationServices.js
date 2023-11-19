const Transportation = require('../models/transportationModel');

const transportationServices = {
   async transportationsDetail() {
      const transportations = await Transportation.find({
         origin: req.query.origin,
         destination: req.query.destination,
         departureDate: req.query.departureDate,
         arrivalDate: req.query.arrivalDate,
         'details.airplane.flightType': req.query.flightType,
         'details.airplane.age': 'adult',
         'details.airplane.seat': 'economy'
     })
     .sort({ 'details.airplane.fare.adult.economy': 1 }) // 최저가격순으로 정렬합니다.
     .select('transportationId types origin destination departureDate arrivalDate details.airplane'); // 필요한 필드만 선택합니다.

     // 검색된 교통수단을 반환합니다.
     res.json(transportations);
   }
}

module.exports = transportationServices;