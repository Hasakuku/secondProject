const User = require('../models/userModel');
const hashPassword = require('../utils/hashPW');
const nodemailer = require('nodemailer');
const { BadRequestError, InternalServerError } = require('../utils/customError')

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
      throw new BadRequestError('해당 이메일로 가입된 계정이 없습니다.');
    }
    if (user.name !== name) {
      throw new BadRequestError('해당 이름으로 가입된 계정이 없습니다.');
    }
    // 임시 비밀번호 생성
    const createPW = crypto.randomBytes(20).toString('hex');
    const tempPW = hashPassword(createPW);

    // 임시 비밀번호로 업데이트
    user.password = tempPW;
    await user.save();

    // 이메일 전송 설정
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'YOUR_EMAIL@gmail.com',
        pass: 'YOUR_PASSWORD',
      },
    })

    // 이메일 전송
    const mailOptions = {
      from: 'YOUR_EMAIL@gmail.com',
      to: user.email,
      subject: '임시 비밀번호 발급',
      text: `귀하의 임시 비밀번호는 ${createPW} 입니다.`,
    };
    transporter.sendMail(mailOptions);
    return;
  }
}
module.exports = userService;