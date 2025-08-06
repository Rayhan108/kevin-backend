// import AppError from '../../errors/AppError';

import AppError from "../../errors/AppError";
import { UserModel } from "../User/user.model";
import { IBookServices, TUpdateTask } from "./bookservice.interface";


import httpStatus from 'http-status';
import BookServiceModel from "./bookservice.model";


const getSpecUserBookServiceFromDB = async (userId: string) => {
  const services = await BookServiceModel.find({ user: userId }) // Find all services for this specific user
    .populate('user'); // Populate the user details (optional if needed)

  return services;
};
const getAllOrderedServiceFromDB = async () => {
  const services = await BookServiceModel.find() // Find all services for this specific user
    .populate('user'); // Populate the user details (optional if needed)

  return services;
};

const addBookServicesIntoDB = async (payload:IBookServices) => {
    // console.log("Services---------->",payload);
 
const  userId = payload.user

  // ✅ Step 1: Check if user exists
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND,'User  not found');
  }

// console.log("Pyload--->",payload);
  const result = (await BookServiceModel.create(payload)).populate('user')
  return result;
};

const updateAssignedTaskInDB = async (payload: TUpdateTask, image: string[]) => {
  const bookedServiceId = payload.bookedService;
  const updatedTodoList = payload.todoList; // expecting string[]

  console.log("images-->", image);

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
addBookServicesIntoDB,getSpecUserBookServiceFromDB,getAllOrderedServiceFromDB,rejectProject,updateProjectStatusAsBooked,updateProjectStatusDone,updateProjectStatusStarted,updateProjectStatusOnTheWay,updateAssignedTaskInDB}
