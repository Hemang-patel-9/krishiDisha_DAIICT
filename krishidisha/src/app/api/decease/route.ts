import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Disable Next.js from handling body parsing since we will handle it ourselves
export const config = {
    api: {
        bodyParser: false,
    },
};

export async function PUT(req: Request) {
    try {
        // Parse the incoming form data to handle file uploads
        const data = await req.formData();
        const file = data.get("file") as File | null;

        if (!file) {
            return NextResponse.json(
                { success: false, message: "No file uploaded" },
                { status: 400 }
            );
        }

        const fileName: string = Math.random().toString(36).substring(2, 17);
        const fileExtension = file.type.split('/')[1];
        console.log(fileName, fileExtension);
        const filePath = path.join(process.cwd(), 'public', 'assets', 'avatar', `${fileName}.${fileExtension}`);

        // Convert the file to a buffer
        const byteData = await file.arrayBuffer();
        const buffer = Buffer.from(byteData);

        // Save the file to the file system
        console.log("haise save chalu to thai gai");
        await fs.writeFile(filePath, buffer);
        console.log("haise save to thai gai");
        // Upload the file to Google AI File Manager
        const fileManager = new GoogleAIFileManager(process.env.API_KEY);
        const uploadResponse = await fileManager.uploadFile(filePath, {
            mimeType: file.type,
            displayName: file.name,
        });

        const getResponse = await fileManager.getFile(uploadResponse.file.name);
        console.log(`Retrieved file ${getResponse.displayName} as ${getResponse.uri}`);

        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro",
        });

        const result = await model.generateContent([
            {
                fileData: {
                    mimeType: uploadResponse.file.mimeType,
                    fileUri: uploadResponse.file.uri,
                },
            },
            { text: "Please give the name of species and diseases if any are present on the given photo of the leaf." },
        ]);

        console.log(await result.response.text());

        // Clean up temporary file
        // await fs.unlink(filePath);

        return NextResponse.json(
            { success: true, message: await result.response.text() },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error while processing the file:", error);
        return NextResponse.json(
            { success: false, message: "Error while processing the file" },
            { status: 500 }
        );
    }
}
