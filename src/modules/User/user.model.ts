import mongoose, { model, Schema } from 'mongoose';

import bcrypt from 'bcrypt';
import config from '../../app/config';
import { IUserMethods, TUser, User } from './user.interface';
import { UserStatus } from '../Auth/auth.constant';

const userSchema = new Schema<TUser, User, IUserMethods>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    image: { type: String },
     profileVedio: [
    {  thumbImageUrl:{type:String},
      title:{type:String},
      videoUrl:{type:String},}
     ],
    bio: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    refercode: { type: String },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['user', 'contractor', 'vipContractor', 'vipMember', 'admin'],
      default: 'user',
    },
    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    referrals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    status: {
      type: String,
      enum: UserStatus,
      default: 'in-progress',
    },
    report: {
      reason: { type: String, default: undefined },
      feedback: { type: String, default: undefined },
      image: { type: String },
    },
    feedback: {
      message: { type: String },
      image: { type: String },
      reply: {
        message: { type: String },
        image: { type: String },
       
      },
    },
    verification: {
      code: {
        type: String,
        default: null,
      },
      expireDate: {
        type: Date,
        default: null,
      },
    },
    address: { type: String, required: true },
    stripeCustomerId: {
      type: String,
      default: null,
    },
    stripePaymentMethodId: {
      type: String,
      default: null,
    },
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
    subServices: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_rounds),
    );
  }

  // ✅ Always hash if verification.code exists and is not already hashed
  if (this.verification?.code && !this.verification.code.startsWith('$2b$')) {
    this.verification.code = bcrypt.hashSync(
      this.verification.code,
      Number(config.bcrypt_salt_rounds),
    );
  }

  next();
});

userSchema.methods.compareVerificationCode = function (userPlaneCode: string) {
  if (!this.verification?.code) return false;
  return bcrypt.compareSync(userPlaneCode, this.verification.code);
};

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
