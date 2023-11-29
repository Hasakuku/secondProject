const Flight = require('../models/flight/flight');
const FlightBooking = require('../models/flight/flightBooking');
const Location = require('../models/location')

const flightService = {
   async flightList() {
      // 특정 도시와 성급에 해당하는 숙소
      const selectCity = { 'address.city': city };
      if (level) selectCity.level >= level;

      const lodgings = await Lodging.find(selectCity).populate('review').populate({
         path: 'rooms',
         populate: {
            path: 'roomType',
            model: 'RoomType'
         }
      }).exec();
      // 체크인&아웃 날짜와 객실당 인원 수 
      const availableLodgings = lodgings.filter(lodging => {
         return lodging.rooms.some(room => {
            return room.roomType.capacity >= adults + children &&
               (!room.status ||
                  room.checkOutDate < checkInDate ||
                  room.checkInDate > checkOutDate);
         });
      });

      // 반환값
      const results = availableLodgings.map(lodging =>
      ({
         lodgingId: lodging.lodgingId,
         hotelName: lodging.name,
         mainImage: lodging.mainImage,
         reviewCount: lodging.review.length,
         averageRating: lodging.review.reduce((sum, review) => sum + review.rating, 0) / lodging.review.length,
      })
      );
      //페이지 네이션
      const perPage = item;
      const start = (page - 1) * perPage;
      const end = page * perPage;
      const result = results.slice(start, end);
      return result;
   },
   // 항공편 상세 검색
   async searchList(data) {
      const { departure, destination, passengers, seatClass, departureDate, arrivalDate, page, item, sort } = data;
      let seatCondition;
      if (seatClass === 'economy') {
         seatCondition = { 'economy.remain': { $gte: passengers } };
      } else if (seatClass === 'business') {
         seatCondition = { 'business.remain': { $gte: passengers } };
      }

      let flights = await Flight.find({
         departure: departure,
         destination: destination,
         departureTime: { $gte: departureDate },
         arrivalTime: { $lte: arrivalDate },
         ...seatCondition
      });

      let results = flights.map(flight => {
         const duration = new Date(flight.arrivalTime) - new Date(flight.departureTime);
         const hours = Math.floor(duration / 1000 / 60 / 60);
         const minutes = Math.floor((duration / 1000 / 60) % 60);
         return {
            airline: flight.airline,
            fare: flight[seatClass].fare,
            departureTime: flight.departureTime,
            arrivalTime: flight.arrivalTime,
            duration: `${hours}시간 ${minutes}분`,
            durationInMinutes: duration / 1000 / 60
         };
      });

      // 정렬
      if (sort === 'price') {
         results.sort((a, b) => a.fare - b.fare);
      } else if (sort === 'time') {
         results.sort((a, b) => a.durationInMinutes - b.durationInMinutes);
      } else {
         results.sort((a, b) => new Date(a.departureTime) - new Date(b.departureTime));
      }

      // 페이지 네이션
      const perPage = item;
      const start = (page - 1) * perPage;
      const end = page * perPage;
      const result = results.slice(start, end);
      return result;
   },

   //항공편 생성
   async createFlight(data) {
      const {
         airplane,
         airline,
         departure,
         destination,
         departureTime,
         arrivalTime,
         seatNumber,
         economy,
         business
      } = data
      const flightData = {
         airplane,
         airline,
         departure,
         destination,
         departureTime,
         arrivalTime,
         seatNumber,
         economy,
         business
      }
      const newFlight = new Flight(flightData);
      await newFlight.save();
      res.status(201).json({ message: "success" })
   },
   // 항공편 예약
   async createBooking(flightId, userId, bookingDetails) {
      const newBooking = new FlightBooking({
         flight: flightId,
         user: userId,
         ...bookingDetails
      })
      await newBooking.save();
      // Flight 정보 가져오기
      const flight = await Flight.findById(flightId);
      // economy 예약이면 economy의 reserve를 증가
      if (bookingDetails.seatClass === 'economy') {
         flight.economy.reserve += 1;
      }
   },
}

module.exports = flightService