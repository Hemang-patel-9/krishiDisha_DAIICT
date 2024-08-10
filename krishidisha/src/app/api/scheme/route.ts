import { NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect';
import SchemeModel from "@/model/Scheme";

export async function GET() {
	await dbConnect();
	console.log("aayvu");
	try {
		const schemes = await SchemeModel.find();
		return NextResponse.json({ success: true, data: schemes }, { status: 200 });
	}
	catch (err: any) {
		console.error("Error while fetching scheme data", err.message, err.stack);
		return NextResponse.json({
			success: false,
			message: "Error while fetching scheme data"
		}, { status: 500 });
	}
}