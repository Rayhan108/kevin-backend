import AppError from '../../errors/AppError';

import httpStatus from 'http-status';
import { TLoginUser, TUser } from './auth.interface';
import { createToken, verifyToken } from './auth.utils';
import config from '../../app/config';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from './auth.model';
import { sendMail } from '../../app/utils/sendMail';
// register new user
const registeredUserIntoDB = async (payload: TUser) => {
  // console.log(payload);
  const user = await UserModel.isUserExistsByEmail(payload.email);
  // console.log(user);
  if (user) {
    throw new AppError(httpStatus.CONFLICT, 'This user is already exists!');
  }
 
  // console.log(newUser);
  const result = await UserModel.create(payload);
  return result;
};
// login user
const loginUser = async (payload: TLoginUser) => {
  const user = await UserModel.isUserExistsByEmail(payload.email);
  // console.log('login user',user);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }
  if (!(await UserModel.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid Credentials!');
  }
  const jwtPayload = {
    userId: user?._id,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

// change password api
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await UserModel.isUserExistsById(userData.userId);
  //   console.log('change pass user',user);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  //checking if the password is correct

  if (!(await UserModel.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  //   console.log('user data chnge pass 78 line',userData);
  await UserModel.findOneAndUpdate(
    {
      _id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
  );
  //   console.log('pass change 89 line',result);
  return null;
};

// refresh token

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { userId, iat } = decoded;

  // checking if the user is exist
  const user = await UserModel.isUserExistsById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  if (
    user.passwordChangedAt &&
    UserModel.isJWTIssuedBeforePasswordChanged(
      user.passwordChangedAt,
      iat as number,
    )
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  }

  const jwtPayload = {
    userId: user?._id,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const forgotPass = async (
 email: string ,
) => {
// console.log("payload--->",payload);

  // Optional: check if user exists
 const user = await UserModel.findOne({ email: email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Send OTP via email
  await sendMail(
    email,
    'Your OTP Code',
    `Your OTP code is: ${otp}. It will expire in 5 minutes.`
  );


//   throw new AppError(httpStatus.OK, 'OTP sent to email');
};


export const AuthServices = {
  registeredUserIntoDB,
  loginUser,
  changePassword,
  refreshToken,
  forgotPass
};
