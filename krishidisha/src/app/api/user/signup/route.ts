import { NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import { hash } from "bcryptjs";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
    const { firstname, lastname, username, password, email, mobile_number } = await req.json()

    await dbConnect();

    try {
        const hashedPassword = await hash(password, 10);
        //token creation code for jwt
        const secretKey = process.env.SECRET_KEY;
        if (!secretKey) {
            throw new Error('SECRET_KEY is not defined in environment variables');
        }

        const newUser = await UserModel.create({ firstname, lastname, username, password: hashedPassword, mobile_number, email });

        const token = jwt.sign({ _id: newUser._id }, secretKey, { expiresIn: '1h' });
        newUser.token = token;

        newUser.save();

        const cookieStore = cookies();
        cookieStore.set('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        return NextResponse.json({ success: true, message: "User created" }, { status: 201 });
    } catch (error: any) {
        console.log(error.message);

        return NextResponse.json({
            success: false,
            message: "Error while Creating user"
        }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const id = req.url.split("signup/")[1];
    if (!id) {
        return NextResponse.json({
            success: false,
            message: "Invalid parameters"
        }, { status: 400 });
    }

    // Convert id to string if it's not already
    const userid = typeof id === 'string' ? id : String(id);

    await dbConnect();
    try {
        const user = await UserModel.deleteOne({ _id: userid });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }

        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error while deleting user data", error);
        return NextResponse.json({
            success: false,
            message: "Error while delete user data"
        }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    const { _id, username, image, description, miscellaneous, address, social_media, languages } = await req.json();

    if (!_id) {
        return NextResponse.json({
            success: false,
            message: "Invalid parameters"
        }, { status: 400 });
    }

    await dbConnect();

    try {
        const user = await UserModel.findOne({ _id: _id });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }

        user.username = username;
        user.image = image;
        user.description = description;
        user.miscellaneous = miscellaneous;
        user.address = address;
        user.social_media = social_media;
        user.languages = languages;

        await user.save();

        return NextResponse.json({ success: true, message: "User updated" }, { status: 200 });
    } catch (error) {
        console.log(error);

        return NextResponse.json({
            success: false,
            message: "Error while updating user"
        }, { status: 500 });
    }

}
