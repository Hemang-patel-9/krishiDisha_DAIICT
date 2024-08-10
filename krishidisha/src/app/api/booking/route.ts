import { NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect';
import BookingModel from "@/model/Booking";
export async function POST(req: Request) {
    await dbConnect();
    try {
        const { email, market_yard, booking_date, booking_timeslot, goods_type, quantity, status } = await req.json();

        const book = new BookingModel({ email, market_yard, booking_date, booking_timeslot, goods_type, quantity, status });

        await book.save();
        return NextResponse.json({ success: true, message: "Booking created" }, { status: 201 });
    } catch (err: any) {
        console.error("Error while register booking", err.message, err.stack);
        return NextResponse.json({
            success: false,
            message: "Error while register booking"
        }, { status: 500 });
    }
}