import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import UserModel from '../../../../model/User';
import { cookies } from 'next/headers';

export async function GET() {
    await dbConnect();
    try {
        const jwt = cookies().get("token");
        if (!jwt) {
            return NextResponse.json(
                { success: false, message: 'User doesn\'t found with jwt.', data: false },
                { status: 401 }
            );
        }
        const user = await UserModel.findOne({ token: jwt.value });
        console.log(user)
        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User doesn\'t found with jwt.', data: false },
                { status: 401 }
            );
        }

        cookies().delete('token');
        user.token = "";
        await user.save();

        return NextResponse.json(
            { success: true, message: 'User logout successfully.' },
            { status: 200 }
        );

    } catch (error: any) {
        console.error('Error while logout user:' + error.message);
        return NextResponse.json(
            { success: false, message: 'Error while fetching user', data: false },
            { status: 500 }
        );
    }
}