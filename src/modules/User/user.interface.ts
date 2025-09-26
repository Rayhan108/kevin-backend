/* eslint-disable no-unused-vars */
import mongoose, {  Model } from 'mongoose';
import { USER_ROLE } from '../Auth/auth.constant';


export type TCreateUserInput = {
  firstName: string;
  lastName: string;
  image?: string;
  email: string;
  phone: string;
  password: string;
  address: string;
};
export type TBecomeContractorInput = {
     email: string;
  location: string;
  zip: string;
  companyName: string;
  noOfEmployee: string;
  servicesYouProvide: string[];   
  subServices: string[]; 
};
//
export interface TUser{
    _id:string;
    userId:string;
      referredBy?: mongoose.Types.ObjectId; 
       referrals?: (mongoose.Types.ObjectId | User)[];
  firstName: string;
  lastName: string;
  bio?: string;
  image: string;
  getReward:boolean;
  email: string;
  phone: string;
verification?: {
    code: string;
    expireDate: Date;
  };
  refercode:string,
  report?:{
    reason:string,
    feedback:string,
    image?:string
  };
  feedback?:{
    message:string,
    image?:string,
    reply?:{
       message:string,
    image?:string,
    }
  };

  password: string;
    passwordChangedAt?: Date;
  role: 'user' | 'contractor'|'vipContractor'|'vipMember'|'admin';
  status: 'in-progress' | 'blocked';
  profileVedio:[
{  thumbImageUrl: string;
  title: string;
  videoUrl: string;}
  ];
  address: string;
  createdAt: Date;
  updatedAt: Date;
  location?:string;
  zip?:string;
  companyName?:string;
    noOfEmployee: string;
  servicesYouProvide: string[];   
  subServices: string[]; 
 stripeCustomerId?: string;
  stripePaymentMethodId?: string;
    subscription?: {
    membershipId: string; // MembershipModel _id
    plan: 'monthly' | 'yearly';
    price: number;
    startedAt: Date;
    expiryDate: Date;
    status: 'active' | 'expired' | 'cancelled';
  };
}

// export interface IUser extends TUser, Document{
//   userId: string;

//   // Contractor-only fields
//   location?: string;
//   zip?: string;
//   companyName?: string;
//   servicesYouProvide?: string[];
// }
export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateToken(): string;
  compareVerificationCode(userPlaneCode: string): boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface User extends Model<TUser,{},IUserMethods> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<TUser>;
  isUserExistsById(id: string): Promise<TUser>;
  //instance methods for checking password
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
   
}
export type TUserRole = keyof typeof USER_ROLE;
