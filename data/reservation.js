const transportation1 = new Transportation({
   transportationId: 1,
   types: 'airplane',
   origin: '출발지',
   destination: '도착지',
   departureDate: new Date('2023-12-01'),
   arrivalDate: new Date('2023-12-02'),
   details: [{
      airplane: {
         flightType: 'one-way',
         age: 'adult',
         seat: 'premium',
         fare: {
            adult: {
               premium: 200000
            }
         }
      }
   }]
});

const transportation2 = new Transportation({
   transportationId: 2,
   types: 'airplane',
   origin: '출발지',
   destination: '도착지',
   departureDate: new Date('2023-12-01'),
   arrivalDate: new Date('2023-12-02'),
   details: [{
      airplane: {
         flightType: 'one-way',
         age: 'child',
         seat: 'economy',
         fare: {
            child: {
               economy: 100000
            }
         }
      }
   }]
});

const transportation3 = new Transportation({
   transportationId: 3,
   types: 'train',
   origin: '도착지',
   destination: '출발지',
   departureDate: new Date('2023-12-10'),
   arrivalDate: new Date('2023-12-11'),
   details: [{
      train: {
         age: 'adult',
         seat: 'economy',
         fare: {
            adult: {
               economy: 50000
            }
         }
      }
   }]
});

const transportation4 = new Transportation({
   transportationId: 4,
   types: 'train',
   origin: '도착지',
   destination: '출발지',
   departureDate: new Date('2023-12-10'),
   arrivalDate: new Date('2023-12-11'),
   details: [{
      train: {
         age: 'child',
         seat: 'premium',
         fare: {
            child: {
               premium: 80000
            }
         }
      }
   }]
});

const reservation = new Reservation({
	reservationId: 1,
	user: '사용자ID',
	room: '방ID',
	transportation: [transportation1._id, transportation2._id, transportation3._id, transportation4._id],
	checkInDate: new Date('2023-12-02'),
	checkOutDate: new Date('2023-12-10'),
	status: 'confirmed',
	adults: 2,
	children: 2,
	infants: 0
});
