import AppError from "../../errors/AppError";
import { IDocumentVerification } from "./verification.interface";
import httpStatus from 'http-status';
import DocumentVerification from "./verification.model";
import { UserModel } from "../User/user.model";



const addDocumentIntoDB = async (payload:IDocumentVerification) => {
    // console.log("info---------->",payload);
const user = await UserModel.findById(payload?.contractor)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND,'User  not found');
  }
  const existingVerification = await DocumentVerification.findOne({ contractor: payload?.contractor });

  if (existingVerification) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Document verification already exists for this contractor');
  }
// console.log("Pyload--->",payload);
  const result = (await DocumentVerification.create(payload)).populate('contractor')
  return result;
};

const getAllDocumentForSingleUserFromDB = async (id:string)=>{

    // console.log("id----->", id);
    
    // Query the database to find all document verification entries for the given user ID
    const documents = await DocumentVerification.find({ contractor: id }).populate('contractor');

    // Check if documents were found
    if (documents.length === 0) {
    //   console.log('No document verifications found for the given user ID');
      return null;
    }

    // console.log("Documents found:", documents);
    return documents;
  
}
const updateDocApproveStatusFromDB = async (id:string,status:string)=>{

    // console.log("id----->", id);
    
    // Query the database to find all document verification entries for the given user ID
    const documents = await DocumentVerification.findById(id)
  // If no service is found, throw an error
  if (!documents) {
    throw new AppError(httpStatus.NOT_FOUND, 'documents not found');
  }

  // Update projectStatus to "accepted"
documents.licenseStatus = status as 'pending'| 'rejected'|'approved';

  // Save the updated service
  await documents.save();
    return documents;
  
}
const getAllDocumentFromDB = async ()=>{

    // console.log("id----->", id);
    
    // Query the database to find all document verification entries for the given user ID
    const documents = await DocumentVerification.find().populate('contractor');


    // console.log("Documents found:", documents);
    return documents;
  
}




export const verificationServices = {
    addDocumentIntoDB,getAllDocumentForSingleUserFromDB,getAllDocumentFromDB,updateDocApproveStatusFromDB
}