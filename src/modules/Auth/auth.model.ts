import { model, Schema } from 'mongoose';

import bcrypt from 'bcrypt';
import config from '../../app/config';
import { UserStatus } from './auth.constant';
import { TUser, User } from './auth.interface';


const userSchema = new Schema<TUser, User>(
  {
firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    image: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['user', 'contractor'],
      default: 'user',
    },
     status: {
      type: String,
      enum: UserStatus,
      default: 'in-progress',
    },
    address: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

    // Contractor-only fields
    location: { type: String },
    zip: { type: String },
    companyName: { type: String },
    servicesYouProvide: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await UserModel.findOne({ email }).select('+password');
};

userSchema.statics.isUserExistsById = async function (id: string) {
  return await UserModel.findById(id).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};



export const UserModel = model<TUser, User>('User', userSchema);
