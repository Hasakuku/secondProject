const User = require('../models/userModel');
const hashPassword = require('../utils/hashPW');
const { NotFoundError, BadRequestError, UnauthorizedError } = require('../utils/customError')

// 회원 가입
const signupService = async (email, userName, password, birthDay, address, userRole) => {
   const findedUser = await User.findOne({ email });
   if (findedUser) {
     throw new BadRequestError('이미 가입하신 회원입니다.');
   }
   const hashedPassword = hashPassword(password);
   const user = await User.create({
     email,
     userName,
     birthDay,
     address,
     password: hashedPassword,
     userRole,
   });
 
   if (!user) {
     throw new NotFoundError('사용자가 존재하지 않습니다.');
   }
 
   return user;
 };

// 로그인
const loginService = async (email, password) => {
   const user = await User.findOne({ email });
   if (user === null) {
     throw new NotFoundError('이메일 또는 비밀번호 불일치입니다.');
   }
 
   if (user && user.password !== hashPassword(password)) {
     throw new UnauthorizedError('이메일 또는 비밀번호 불일치입니다.');
   }
   return user;
 };

module.exports = { signupService, loginService };