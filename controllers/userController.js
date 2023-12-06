const asynchandler = require('express-async-handler')
const userService = require('../services/userService')
const setToken = require('../utils/jwtToken')
const { InternalServerError, BadRequestError } = require('../utils/customError')

//*회원가입
const signup = asynchandler(async (req, res) => {
   const { email, name, password, address, isAdmin } = req.body;
   await userService.signupService(email, name, password, address, isAdmin);
   res.json({ message: '회원 가입이 완료 되었습니다.' });
});

//*로그인
const login = asynchandler(async (req, res, next) => {
   const { email, password } = req.body;
   const user = await userService.loginService(email, password);
   const token = setToken(user);

   // res.cookie('accessToken', token, { domain: 'http://localhost:5173', maxAge: 3600000, });
   res.cookie('accessToken', token, { maxAge: 3600000, httpOnly: true });
   res.json({ message: `${user.name}님 환영합니다!` });
})

//*로그아웃
const logout = asynchandler(async (req, res) => {
   res.cookie('accessToken', null, { maxAge: 0 })
   if (res.cookie.accessToken) {
      throw new InternalServerError('정상적으로 로그 아웃이 되지 않았습니다');
   } res.json({ message: '이용해주셔서 감사합니다.' })
});

//* email&PW찾기
const findUser = asynchandler(async (req, res) => {
   const { email, name } = req.body;
   // if(!secretCode) throw new BadRequestError('비밀코드를 입력하세요')
   const result = await userService.findUser(email, name);
   res.json({ 'password': result, message: '임시 비밀번호 발급완료' });
})

//* 회원정보 수정
const updateUser = asynchandler(async (req, res) => {
   const user = req.user
   const data = req.body;
   const result = await userService.updateUser(user, data);
   res.status(200).json({ message: '회원정보 수정에 성공하였습니다' })
})

//* 회원정보 조회
const getUser = asynchandler(async (req, res) => {
   const user = req.user;
   const result = await userService.getUser(user);
   res.status(200).json({ data: result, message: '회원정보 조회에 성공하였습니다' })
})

//* 즐겨찾기 등록
const addFavorites = asynchandler(async (req, res) => {
   const user = req.user;
   const data = req.body;
   const result = await userService.addFavorites(user, data);
   res.status(200).json({ message: '즐겨찾기에 추가되었습니다.' })
})

//* 즐겨찾기 삭제
const delFavorites = asynchandler(async (req, res) => {
   const user = req.user;
   const data = req.body;
   const result = await userService.delFavorites(user, data);
   res.status(200).json({ message: '즐겨찾기에 삭제되었습니다.' })
})
const userController = { signup, login, logout, findUser, updateUser, getUser, addFavorites, delFavorites }
module.exports = userController;