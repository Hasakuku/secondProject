const jwt = require('jsonwebtoken');
const secret = process.env.ACCESS_SECRET;

module.exports = (user) => {
   const token = jwt.sign(
      { id: user._id, userRole: user.isAdmin },
      secret,
      { expiresIn: '1h', }
   );

   return token;
};