const asyncHandler = require('express-async-handler')
const BadRequestError = require('../utils/customError')

const calculateAge = (birthDay) => {
   const today = new Date();
   const birth = new Date(birthDay);
   let age = today.getFullYear() - birth.getFullYear();
   const month = today.getMonth() - birth.getMonth();
   if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
      age--;
   }
   return age;
};

const validateAge = asyncHandler((req, res, next) => {
   const { birthDay, fare } = req.body;
   const age = calculateAge(birthDay);
   const isAdult = age >= 13;
   const expectedFare = isAdult ? fare.adult : fare.child;
   if (req.body.fare !== expectedFare) {
      throw new BadRequestError('선택하신 연령과 요금이 올바르지 않습니다.');
   }
   next();
});

module.exports = validateAge;
