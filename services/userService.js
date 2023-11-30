const User = require('../models/user');
const hashPassword = require('../utils/hashPW');
const nodemailer = require('nodemailer');
const crypto = require('crypto')
const { BadRequestError, InternalServerError, NotFoundError } = require('../utils/customError');
const { findById } = require('../models/location');

const userService = {
  //* 회원 가입
  async signupService(email, userName, password, birthDay, address, userRole) {
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
      throw new InternalServerError('회원 생성에 실패하였습니다.');
    }
    return user;
  },

  //* 로그인
  async loginService(email, password) {
    const user = await User.findOne({ email });
    if (user === null) {
      throw new BadRequestError('이메일 또는 비밀번호 불일치입니다.');
    }

    if (user && user.password !== hashPassword(password)) {
      throw new BadRequestError('이메일 또는 비밀번호 불일치입니다.');
    }
    return user;
  },

  //* email&비밀번호 찾기
  async findUser(email, name) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundError('해당 이메일로 가입된 계정이 없습니다.');
    }
    if (user.name !== name) {
      throw new NotFoundError('해당 이름으로 가입된 계정이 없습니다.');
    }
    // 임시 비밀번호 생성
    const createPW = crypto.randomBytes(4).toString('hex');
    const tempPW = hashPassword(createPW);

    // 임시 비밀번호로 업데이트
    user.password = tempPW;
    await user.save();
    return createPW;
  },
  //* 회원정보 조회
  async getUser(data) {
    const id = data._id
    const user = await User.findById(id);
    return {
      userId: user.userId,
      name: user.name,
      email: user.email,
      level: user.level,
      isAdmin: user.isAdmin,
      favorites: user.favorites,
    }
  },

  //* 회원정보 수정
  async updateUser(user, data) {
    const id = user._id
    const users = await User.findById(id);
    const { password, ...rest } = data;
    if (!users) {
        throw new NotFoundError('사용자를 찾을 수 없습니다.');
    }
    if (password) {
        const hashedPassword = hashPassword(password)
        rest.password = hashedPassword
    }
    const updatedUser = await User.updateOne(
        { _id: id },
        { rest },
    );
    if (updatedUser.modifiedCount === 0) {
        throw new InternalServerError('서버 오류입니다.');
    }
  }

}
module.exports = userService;