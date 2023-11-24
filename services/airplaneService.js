const Airplane = require('../models/TP/airplaneModel');

const AirplaneService ={
   async airplaneList(city, checkInDate, checkOutDate, adults, children, level, page, item) {
      // 특정 도시와 성급에 해당하는 숙소
      const selectCity = { 'address.city': city };
      if (level) selectCity.level >= level;

      const airplanes = await Airplane.find(selectCity).populate('review').populate({
         path: 'rooms',
         populate: {
            path: 'roomType',
            model: 'RoomType'
         }
      }).exec();
      console.log(airplanes)
      // 체크인&아웃 날짜와 객실당 인원 수 
      const availableairplanes = airplanes.filter(airplane => {
         return airplane.rooms.some(room => {
            return room.roomType.capacity >= adults + children &&
               (!room.roomBooking.status ||
                  room.roomBooking.checkOutDate < checkInDate ||
                  room.roomBooking.checkInDate > checkOutDate);
         });
      });

      // 반환값
      const results = availableairplanes.map(airplane =>
      ({
         airplaneId: airplane.airplaneId,
         hotelName: airplane.name,
         mainImage: airplane.mainImage,
         reviewCount: airplane.review.length,
         averageRating: airplane.review.reduce((sum, review) => sum + review.rating, 0) / airplane.review.length,
      })
      );
      //페이지 네이션
      const perPage = item;
      const start = (page - 1) * perPage;
      const end = page * perPage;
      const result = results.slice(start, end);
      return result;
   },
   async a() {},
   async a() {},
}

module.exports = AirplaneService