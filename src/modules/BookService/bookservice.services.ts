// import AppError from '../../errors/AppError';

import AppError from "../../errors/AppError";
import { UserModel } from "../User/user.model";
import { IBookServices, TUpdateTask } from "./bookservice.interface";


import httpStatus from 'http-status';
import BookServiceModel from "./bookservice.model";
import QueryBuilder from "../../app/builder/QueryBuilder";


const getSpecUserBookServiceFromDB = async (userId: string) => {
  const services = await BookServiceModel.find({ user: userId }) 
    .populate('user').populate('serviceId'); 

  return services;
};
const getAllSingleContrctrOrderFromDB = async (userId: string) => {

  
        // console.log("userId--->", userId);
        
 
        const services = await BookServiceModel.find()
            .populate({
                path: 'serviceId',  
                match: { contractorId: userId }, 
                select: 'contractorId title details'  
            })
            .populate('user')  
            .exec();

       
        const filteredServices = services.filter(service => service.serviceId !== null);

        return filteredServices;

        
};



const getAllOrderedServiceFromDB = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(BookServiceModel.find(),query)

    queryBuilder
    .search(['serviceType'])
    .filter()
    .sort()
    .paginate();

  const result = await queryBuilder.modelQuery.populate('user'); // Populate the user details (optional if needed)
  const meta = await queryBuilder.countTotal();

  return { meta, result };
  
};

const addBookServicesIntoDB = async (payload:IBookServices,meId:string) => {
    // console.log("Services---------->",payload);
 
const  userId = meId

  // ✅ Step 1: Check if user exists
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND,'User  not found');
  }
const newData={
  ...payload,user:userId
}
// console.log("Pyload--->",payload);
  const result = (await (await BookServiceModel.create(newData)).populate('user')).populate('serviceId')
  return result;
};

const updateAssignedTaskInDB = async (payload: TUpdateTask, image: string[]) => {
  const bookedServiceId = payload.bookedService;
  const updatedTodoList = payload.todoList; // expecting string[]

  // console.log("images-->", image);

  // Find the service by its _id
  const service = await BookServiceModel.findById(bookedServiceId);

  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }

  // Update the todoList
  if (Array.isArray(updatedTodoList)) {
    service.todoList = updatedTodoList;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, 'todoList must be an array of strings');
  }

  // Update the image paths
  if (image && Array.isArray(image)) {
    service.image = image; // Assuming 'photos' field in the model is used for storing image paths
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, 'Image paths should be an array of strings');
  }

  // Save the updated service
  await service.save();

  return service;  // Return the updated service
};
const updateProjectStatusAsBooked = async (serviceId: string) => {
  // Find the service by its _id
  const service = await BookServiceModel.findById(serviceId);

  // If no service is found, throw an error
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }

  // Update projectStatus to "accepted"
  service.status = 'booked';

  // Save the updated service
  await service.save();

  return service;  // Return the updated service
};
const updateProjectStatusOnTheWay = async (serviceId: string) => {
  // Find the service by its _id
  const service = await BookServiceModel.findById(serviceId);

  // If no service is found, throw an error
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }

  // Update projectStatus to "accepted"
  service.status = 'onTheWay';

  // Save the updated service
  await service.save();

  return service;  // Return the updated service
};
const updateProjectStatusStarted = async (serviceId: string) => {
  // Find the service by its _id
  const service = await BookServiceModel.findById(serviceId);

  // If no service is found, throw an error
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }

  // Update projectStatus to "accepted"
  service.status = 'started';

  // Save the updated service
  await service.save();

  return service;  // Return the updated service
};
const updateProjectStatusDone = async (serviceId: string) => {
  // Find the service by its _id
  const service = await BookServiceModel.findById(serviceId);

  // If no service is found, throw an error
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }

  // Update projectStatus to "accepted"
  service.status = 'done';

  // Save the updated service
  await service.save();

  return service;  // Return the updated service
};
const rejectProject = async (serviceId: string) => {
  // Find the service by its _id
  const service = await BookServiceModel.findById(serviceId);

  // If no service is found, throw an error
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }

  // Update projectStatus to "accepted"
  service.projectStatus = 'rejected';

  // Save the updated service
  await service.save();

  return service;  // Return the updated service
};





export const BookServices = {
addBookServicesIntoDB,getSpecUserBookServiceFromDB,getAllOrderedServiceFromDB,rejectProject,updateProjectStatusAsBooked,updateProjectStatusDone,updateProjectStatusStarted,updateProjectStatusOnTheWay,updateAssignedTaskInDB,getAllSingleContrctrOrderFromDB}
