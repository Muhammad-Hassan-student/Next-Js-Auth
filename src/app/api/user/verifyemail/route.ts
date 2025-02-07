import {connect} from '@/db/db.config'
import { NextRequest, NextResponse } from 'next/server';
import User from '@/model/user.model'

connect();

export async function POST (request:NextRequest) {
    try {
        const reqbody = await request.json();
        const {token} = await reqbody;

        //check token is exist or not
        const user= await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

        if(!user){
            return NextResponse.json({message: "Invalid token"},{status: 400});
        }

        console.log(user);

        user.isVerified = true;
        user.veirfyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();
        return NextResponse.json({
            message: "Email verified successfully",
            success:  true
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status: 500});
    }
}