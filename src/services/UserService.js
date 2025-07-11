const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  ganneralAccessToken,
  ganneralRefreshToken,
} = require("./Jwtservices.js");
const { sendEmailOtp } = require("./EmailServices.js");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser !== null) {
        resolve({
          status: "ERR",
          message: "Email đã tồn tại",
        });
      }
      const haskPassword = bcrypt.hashSync(password, 10);

      const createUser = await User.create({
        name: name,
        email: email,
        password: haskPassword,
        phone: phone,
      });
      if (createUser) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createUser,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = userLogin;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "Email không tồn tại",
        });
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password);

      if (!comparePassword) {
        resolve({
          status: "ERR",
          message: "Mật khẩu không đúng",
        });
      }
      const access_token = await ganneralAccessToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });

      const refresh_token = await ganneralRefreshToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });

      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "Khong ton tai",
        });
      }

      const updateUser = await User.findByIdAndUpdate(id, data, { new: true });

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updateUser,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deteleUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });

      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "Khong ton tai",
        });
      }

      await User.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: "Xóa thành công",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find();

      if (!allUser) {
        resolve({
          status: "ERROR",
          message: "Không còn tài khoản",
        });
      }

      resolve({
        status: "OK",
        message: "Lấy thành công",
        data: allUser,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const getUser = await User.findById({ _id: id });

      if (!getUser) {
        resolve({
          status: "ERROR",
          message: "không tìm thấy tài khoảng",
        });
      }

      resolve({
        status: "OK",
        message: "Lấy tài khoảng thành công",
        data: getUser,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const refreshTokenService = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.verify(token,   process.env.key_refresh_token, async (err, user) => {
        if (err) {
          resolve({
            message: "không nhận được token",
            status: "ERROR",
          });
        }
        const access_token = await ganneralAccessToken({
          id: user?.id,
          isAdmin: user?.isAdmin,
        });

        resolve({
          status: "OK",
          message: "cap nhat thanh cong",
          access_token,
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};







module.exports = {
  createUser,
  loginUser,
  updateUser,
  deteleUser,
  getAllUser,
  getUser,
  refreshTokenService,

};
