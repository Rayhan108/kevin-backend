
// import httpStatus from 'http-status';

import { IVipMember } from './vipmember.interface';
import { VipMemberModel } from './vipmember.model';



// import httpStatus from 'http-status';


// const getAllReviewFromDB = async()=>{
//     const reviews = await ServiceModel.find().populate('contractorId');
//     return reviews;
// }

const askingQues = async (payload: IVipMember) => {
//   console.log("create askAProQues-->",payload);
  const result = (await VipMemberModel.create(payload)).populate('user')
  return result
};



export const VipMemberServices = {
askingQues
};
