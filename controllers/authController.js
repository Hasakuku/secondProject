const asynchandler = require('express-async-handler')
const { loginService, signupService } = require('../services/authServices')
const setToken = require('../utils/jwtToken')
const { InternalServerError } = require('../utils/customError')
//회원가입
const signup = asynchandler(async (req, res) => {
   const { email, userName, password, birthDay, address, userRole } = req.body;
   await signupService(email, userName, password, birthDay, address, userRole);
   res.json({ message: '회원 가입이 완료 되었습니다.' });
});

//로그인
const login = asynchandler(async (req, res, next) => {
   const { email, password } = req.body;
   const user = await loginService(email, password);
   const token = setToken(user);

   res.cookie('accessToken', token, { maxAge: 3600000 });
   res.json({ data: token, message: `${user.userName}님 환영합니다!` });
})

//로그아웃
const logout = asynchandler(async (req, res) => {
   res.cookie('accessToken', null, { maxAge: 0 })
   if (res.cookie.accessToken) {
      throw new InternalServerError('정상적으로 로그 아웃이 되지 않았습니다.');
   } res.json({ message: '이용해주셔서 감사합니다.' })
});

module.exports = { signup, login, logout }