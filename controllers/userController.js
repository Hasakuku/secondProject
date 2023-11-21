const asynchandler = require('express-async-handler')
const userService = require('../services/userService')
const setToken = require('../utils/jwtToken')
const { InternalServerError } = require('../utils/customError')

//회원가입
const signup = asynchandler(async (req, res) => {
   const { email, userName, password, birthDay, address, userRole } = req.body;
   await userService.signup(email, userName, password, birthDay, address, userRole);
   res.json({ message: '회원 가입이 완료 되었습니다.' });
});

//로그인
const login = asynchandler(async (req, res, next) => {
   const { email, password } = req.body;
   const user = await userService.login(email, password);
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

// email&PW찾기
const findUser = asynchandler(async (req, res) => {
   const { email, name } = req.body;
   await userService.findUser(email, name);
   res.json({ message: '임시 비밀번호를 이메일로 전송하였습니다.' });
})

const userController = { signup, login, logout, findUser }
module.exports = userController;