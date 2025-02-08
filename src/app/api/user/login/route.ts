import { connect } from '@/db/db.config'
import { NextRequest, NextResponse } from 'next/server';
import User from '@/model/user.model'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect();

export async function POST(request: NextRequest) {
    try {
        const reqbody = request.json();
        const { email, password } = await reqbody;

        //chechk user exist or not
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User is not found. Please enter your email correctly." }, { status: 403 });
        }

        //if user is exist so match password
        const matchPassword = await bcryptjs.compare(password, user.password);
        if (!matchPassword) {
            return NextResponse.json({
                message: "Invalid credientials",
            }, { status: 400 });
        }

        //if user password match so make the token
        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: "Logged in successfylly",
            success: true,
        });

        //set cookies
        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response



    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}