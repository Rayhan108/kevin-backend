// import AppError from '../../errors/AppError';

import QueryBuilder from '../../app/builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { UserModel } from '../User/user.model';
import { IServices } from './services.interface';
import ServiceModel from './services.model';
import httpStatus from 'http-status';   

const getAllServicesFromDB = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(ServiceModel.find(), query);

  queryBuilder
    .search(['title', 'description', 'categoryName','location','details'])
    .filter()
    .sort()
    .paginate();

  const result = await queryBuilder.modelQuery.populate('contractorId');

  const meta = await queryBuilder.countTotal();

  return { meta, result };
};

const getAllServicesForSpecUserFromDB = async (contractorId: string) => {
  const services = await ServiceModel.find({ contractorId }).populate(
    'contractorId',
  );
  return services;
};
const getSingleServicesFromDB = async (serviceId: string) => {
  const services =
    await ServiceModel.findById(serviceId).populate('contractorId');
  return services;
};

const addServicesIntoDB = async (payload: IServices, image: string) => {
  // console.log(image);
  const userId = payload.contractorId;
  // console.log("payload-->",payload);
  // ✅ Step 1: Check if user exists
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error('User (contractor) not found');
  }

  // ✅ Step 2: Check if user is actually a contractor (optional but safe)
  if (user.role !== 'contractor') {
    throw new Error('Only contractors can create services');
  }
  // console.log("Pyload--->",payload);
  payload.image = image;

  const result = (await ServiceModel.create(payload)).populate('contractorId');
  return result;
};

const acceptProject = async (serviceId: string) => {
  // Find the service by its _id
  const service = await ServiceModel.findById(serviceId);

  // If no service is found, throw an error
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }

  // Update projectStatus to "accepted"
  service.projectStatus = 'accepted';

  // Save the updated service
  await service.save();

  return service; // Return the updated service
};
const rejectProject = async (serviceId: string) => {
  // Find the service by its _id
  const service = await ServiceModel.findById(serviceId);

  // If no service is found, throw an error
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }

  // Update projectStatus to "accepted"
  service.projectStatus = 'rejected';

  // Save the updated service
  await service.save();

  return service; // Return the updated service
};

export const ServicesService = {
  addServicesIntoDB,
  getAllServicesFromDB,
  acceptProject,
  rejectProject,
  getAllServicesForSpecUserFromDB,
  getSingleServicesFromDB,
};
