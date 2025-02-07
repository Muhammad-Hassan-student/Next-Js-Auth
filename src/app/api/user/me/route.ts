import {connect} from '@/db/db.config'
import { NextRequest, NextResponse } from 'next/server';
import User from '@/model/user.model'
import { getDataFromToken } from '@/helpers/getDataFromToken';

connect();

export async function POST(request:NextRequest) {
    try {
        const userId =  await getDataFromToken(request);
        const user = await User.findOne({_id:userId}).select("-password");
        if(!user){
            return NextResponse.json({message: "User not found"},{status: 400});
        }
        return NextResponse.json({
            success: true,
            message: "User found",
             data:user,
        })
    } catch (error) {
        return console.log(error);
    }
}