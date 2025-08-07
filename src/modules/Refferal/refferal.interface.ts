import { Document } from "mongoose";


export interface IReffer extends Document {
email:string ;
link:string;  
code:string;
}
