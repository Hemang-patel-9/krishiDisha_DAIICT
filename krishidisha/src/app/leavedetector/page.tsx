'use client'
import Navbar from "@/component/Navbar";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function LeaveDetector() {

    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File>();
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState<boolean>(false); 


    const handleFileChange = (e: any) => {
        e.preventDefault();
        if (e.target.files) {
            setFile(e.target.files[0]);
            const objectUrl = URL.createObjectURL(e.target.files[0]);
            setPreview(objectUrl);

        }
    };

    const detectLeaf = async (event: any) => {

        event.preventDefault();

        if (!file) {
            alert("Please select a file")
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/jpeg', 'image/png', 'image/svg+xml'];
        if (!allowedTypes.includes(file.type)) {
            alert("invalid file type")
            return;
        }
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            alert('File too large');
            return;
        }

        // Create a FormData object and append the file
        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);

        try {
            const response = await fetch('/api/decease', {
                method: 'PUT',
                body: formData
            });

            const result = await response.json();
            console.log(result);

            setDescription(result.message)
        } catch (error) {
            console.error('Error uploading file:', error);
            console.log('An error occurred during file upload');
        } finally {
            setLoading(false); // Step 2: Set loading to false after API call
        }
    };

    return (
        <>
        <Navbar/>
            <div className="bg-color4 py-10">
                <p className="text-3xl text-color2 font-extrabold flex justify-center">Leaf Description Analyzer</p>
                <div className="flex justify-evenly py-10">
                    <div className="h-[70vh] w-[30%]  border border-color2 flex flex-col items-center justify-center">
                        <input type="file" className="bg-color2" onChange={(e: any) => {
                            handleFileChange(e);
                        }}></input>
                        {/* <div>
                            
                        </div> */}
                        {preview ? (
                            <div style={{ marginTop: '20px' }} className='flex flex-col items-center justify-center'>
                                <h4 className='mb-2'>Image Preview:</h4>
                                <Image
                                    src={preview}
                                    alt="Preview"
                                    style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ddd', padding: '5px' }}
                                    width={200}
                                    height={200}
                                />
                                <button className='bg-color2 py-2 px-3 rounded-md mt-2' onClick={(e: any) => {
                                    detectLeaf(e);
                                }}>Upload</button>
                            </div>
                        ):null}

                    </div>
                    {
                        loading? (
                            <div className="flex justify-center items-center h-[70vh] w-[30%] bg-color2 p-5">
                                <div className="spinner-border text-white" role="status">
                                    <span >Loading...</span>
                                </div>
                            </div>
                        ) : <div className="h-[70vh] w-[30%] bg-color2 p-5">{description}</div>
                    }
                    
                </div>
            </div>
        </>
    )
}