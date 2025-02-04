
import {connect} from '@/db/db.config'
import { NextRequest, NextResponse } from 'next/server';
import User from '@/model/user.model'
import bcryptjs from 'bcryptjs'
import { sendMail } from '@/helpers/mailer';

connect();

export async function POST (req: NextRequest){
    try {
        const reqBody = req.json();
        const {username, email,password} = await reqBody;
        console.log(reqBody);
        //validation
        if(!username || !email || !password || username === "" || email === "" || password === ""){
            return NextResponse.json({message: "Please required all fields"});
        } 

        //check user is exist or not
        const user = await User.findOne({email});

        if(user){
            return NextResponse.json({message: "User is already exist", status: 403});
        }

        //hashed password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        //user add in user model
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        console.log(savedUser);

        //send mail
        await sendMail({email, emailType: "VERIFY", userId: savedUser._id});

        return NextResponse.json({
            message: "User register successfully",
            success: true,
            savedUser,
        })

        //
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status: 500});
    }
}