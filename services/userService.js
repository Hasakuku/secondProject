const User = require('../models/user');
const hashPassword = require('../utils/hashPW');
const Review = require('../models/review');
const RoomBooking = require('../models/lodging/roomBooking');
const crypto = require('crypto')
const { BadRequestError, InternalServerError, NotFoundError, ValidationError } = require('../utils/customError');
const { findById } = require('../models/location');
const { OrderedBulkOperation } = require('mongodb');
const Lodging = require('../models/lodging/lodging');
const Attraction = require('../models/attraction/attraction');
function validatePassword(password) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);

  if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
    throw new BadRequestError('비밀번호는 대문자, 소문자, 숫자, 특수문자가 각각 최소 1개 이상 포함되어야 합니다.');
  }
}
const userService = {
  //* 회원 가입
  async signupService(email, name, password, address, isAdmin) {
    const findedUser = await User.findOne({ email });
    if (findedUser) {
      throw new BadRequestError('이미 가입하신 회원입니다.');
    }
    validatePassword(password)
    let userId = 0;
    const hashedPassword = hashPassword(password);
    const user = await User.create({
      userId,
      email,
      name,
      address,
      password: hashedPassword,
      isAdmin,
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
  async findUser(email, name,) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundError('해당 이메일로 가입된 계정이 없습니다.');
    }
    if (user.name !== name) {
      throw new NotFoundError('해당 이름으로 가입된 계정이 없습니다.');
    }
    // if(user.secretCode !== secretCode) {
    //   throw new ValidationError('코드가 일치하지 않습니다.');
    // }
    // 임시 비밀번호 생성
    function generatePassword() {
      const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowercase = 'abcdefghijklmnopqrstuvwxyz';
      const numbers = '0123456789';
      const symbols = '!@#$%^&*()_+=-';

      const all = uppercase + lowercase + numbers + symbols;
      let password = '';

      password += uppercase[Math.floor(Math.random() * uppercase.length)];
      password += lowercase[Math.floor(Math.random() * lowercase.length)];
      password += numbers[Math.floor(Math.random() * numbers.length)];
      password += symbols[Math.floor(Math.random() * symbols.length)];

      for (let i = 4; i < 8; i++) {
        password += all[Math.floor(Math.random() * all.length)];
      }

      return password;
    }

    const createPW = generatePassword();
    // const createPW = crypto.randomBytes(4).toString('hex');
    const tempPW = hashPassword(createPW);

    // 임시 비밀번호로 업데이트
    user.password = tempPW;
    await user.save();
    return createPW;
  },
  //* 회원정보 조회
  async getUser(data) {
    const id = data._id
    if (!id) throw new NotFoundError('user의 id 값을 찾을 수 없습니다.')
    const user = await User.findById(id);
    if (!user) throw new NotFoundError('user를 찾을 수 없습니다.')
    const review = await Review.find({ user: id })
    const booking = await RoomBooking.find({ user: id })
    return {
      userId: user.userId,
      name: user.name,
      email: user.email,
      level: user.level,
      // isAdmin: user.isAdmin,
      booking: booking,
      favorites: user.favorites,
      review: review,
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
    if (rest.isAdmin) throw new BadRequestError('사용자는 관리자를 변경할 수 없습니다.')
    const updatedUser = await User.updateOne(
      { _id: id },
      { rest },
    );
    if (updatedUser.modifiedCount === 0) {
      throw new InternalServerError('서버 오류입니다.');
    }
  },

  //* 즐겨찾기 등록
  async addFavorites(u, data) {
    const userId = u._id;
    const { attraction, lodging } = data;

    // 유저를 찾기
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('유저를 찾을 수 없습니다.');
    }

    // 관광지 아이디가 있으면
    if (attraction) {
      const findAttraction = await Attraction.findById(attraction);
      if (!findAttraction) {
        throw new NotFoundError('관광지를 찾을 수 없습니다.');
      }
      // 이미 즐겨찾기에 추가된 관광지인지 확인
      if (user.favorites.attractions.includes(attraction)) {
        throw new BadRequestError('이미 즐겨찾기에 추가된 관광지입니다.');
      }
      // 즐겨찾기에 관광지를 추가
      user.favorites.attractions.push(attraction);
    }

    // 숙소 아이디가 있으면
    if (lodging) {
      const findLodging = await Lodging.findById(lodging);
      if (!findLodging) {
        throw new NotFoundError('숙소를 찾을 수 없습니다.');
      }
      // 이미 즐겨찾기에 추가된 숙소인지 확인
      if (user.favorites.lodgings.includes(lodging)) {
        throw new BadRequestError('이미 즐겨찾기에 추가된 숙소입니다.');
      }
      // 즐겨찾기에 숙소를 추가
      user.favorites.lodgings.push(lodging);
    }

    const result = await user.save();
    return result
  },

  //* 즐겨찾기 제거
  async delFavorites(u, data) {
    const userId = u._id;
    const { attraction, lodging } = data;

    // 유저를 찾기
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('유저를 찾을 수 없습니다.');
    }

    // 관광지 아이디가 있으면
    if (attraction) {
      const findAttraction = await Attraction.findById(attraction);
      if (!findAttraction) {
        throw new NotFoundError('관광지를 찾을 수 없습니다.');
      }
      // 즐겨찾기에 추가된 관광지인지 확인
      if (!user.favorites.attractions.includes(attraction)) {
        throw new NotFoundError('즐겨찾기에 추가되지 않은 관광지입니다.');
      }
      // 즐겨찾기에서 관광지를 제거
      user.favorites.attractions.pull(attraction);
    }

    // 숙소 아이디가 있으면
    if (lodging) {
      const findLodging = await Lodging.findById(lodging);
      if (!findLodging) {
        throw new NotFoundError('숙소를 찾을 수 없습니다.');
      }
      // 즐겨찾기에 추가된 숙소인지 확인
      if (!user.favorites.lodgings.includes(lodging)) {
        throw new NotFoundError('즐겨찾기에 추가되지 않은 숙소입니다.');
      }
      // 즐겨찾기에서 숙소를 제거
      user.favorites.lodgings.pull(lodging);
    }

    const result = await user.save();
    return result
  },


}
module.exports = userService;