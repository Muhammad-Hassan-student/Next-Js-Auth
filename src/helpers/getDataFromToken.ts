
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getDataFromToken = (request: NextRequest) => {
    try {
      const token = request.cookies.get('token')?.value || '';
      console.log(token);
      //decoded token 
      const decodedToken:any =  jwt.verify(token,process.env.JWT_SECRET!);
      return decodedToken.id;  
    } catch (error:any) {
        throw new Error(error.message);
    }
}