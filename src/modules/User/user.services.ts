import AppError from '../../errors/AppError';
import { TBecomeContractorInput } from './user.interface';
import { UserModel } from './user.model';
import httpStatus from 'http-status';
const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await UserModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const getSingleUserFromDB = async(id:string)=>{
    const result = await UserModel.findById(id);
    return result;
}
const getAllUserFromDB = async()=>{
    const result = await UserModel.find();
    return result;
}

const updateUserToContractor = async (payload: TBecomeContractorInput) => {
  const user = await UserModel.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  if (user.role === 'contractor') {
    throw new AppError(httpStatus.CONFLICT, 'This user is already a contractor!');
  }

  // Update fields
  const updatedUser = await UserModel.findOneAndUpdate(
    { email: payload.email },
    {
      role: 'contractor',
      location: payload.location,
      zip: payload.zip,
      companyName: payload.companyName,
      servicesYouProvide: payload.servicesYouProvide,
      subServices: payload.subServices || [],
    },
    { new: true } // return the updated document
  );

  return updatedUser;
};

export const UserServices = {
  changeStatus,getSingleUserFromDB,getAllUserFromDB,updateUserToContractor
};
