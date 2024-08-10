"use client";
import React, { useState } from "react";
import Image from "next/image";
import first from "../../../public/assets/images/carousel1.jpg";
import second from "../../../public/organincFarming/3.jpg";
import third from "../../../public/organincFarming/2.jpg";
import Navbar from "@/component/Navbar";
import Organic from '../../../public/assets/images/organic.jpg'
import irrigation from '../../../public/assets/images/irrigation.jpg'
import machine from '../../../public/assets/images/machinery.jpg'

import 'aos/dist/aos.css';
import AOS from 'aos';
AOS.init({ duration: 3000 });

const slides = [
    { url: first, alt: 'Slide 1' },
    { url: second, alt: 'Slide 2' },
    { url: third, alt: 'Slide 3' },
];

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <>
            <div className="bg-gray-200">
                <Navbar />
                <div className="relative w-full h-[90vh] overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {slides.map((slide, index) => (
                            <div key={index} className="flex-shrink-0 w-full h-full">
                                <Image
                                    src={slide.url}
                                    alt={slide.alt}
                                    objectFit="contain" // Ensures the image covers the container
                                    className="w-screen h-screen"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Previous and Next Buttons */}
                    <button
                        onClick={handlePrev}
                        aria-label="Previous Slide"
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-color2 text-white px-4 py-2 rounded-full"
                    >
                        {"<"}
                    </button>
                    <button
                        onClick={handleNext}
                        aria-label="Next Slide"
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-color2 text-white px-4 py-2 rounded-full"
                    >
                        {">"}
                    </button>
                </div>
                <div className="mt-10 flex flex-col items-center text-center">
                    <h1 className="text-4xl text-color2 font-extrabold " data-aos="flip-up" data-aos-duration="1300" data-aos-delay="200">Cultivating Innovation: Empowering Farmers to Grow Smarter, Not Harder</h1>
                    <p className="text-md text-color1 mt-5 mx-16" data-aos="flip-up" data-aos-duration="1300" data-aos-delay="200">Our platform provides cutting-edge tools and insights to boost productivity, enhance sustainability, and drive agricultural success. Join us in transforming farming for a brighter, more prosperous future</p>
                </div>
                <div className="px-20 py-20 flex justify-between" >
                    <div className="bg-color3 h-[45vh] w-[28%] mb-10 z-20" data-aos="zoom-in" data-aos-duration="1300" style={{ borderTopRightRadius: "50px", borderBottomLeftRadius: "50px" }}>
                        <Image src={Organic} alt="organic" style={{ borderTopRightRadius: "50px", borderBottomLeftRadius: "50px" }} className="w-full h-full overflow-hidden object-fill" />
                    </div>
                    <div className="bg-color3 h-[45vh] w-[28%] mb-10 z-20" data-aos="zoom-in" data-aos-duration="1300" style={{ borderTopRightRadius: "50px", borderBottomLeftRadius: "50px" }}>
                        <Image src={irrigation} alt="organic" style={{ borderTopRightRadius: "50px", borderBottomLeftRadius: "50px" }} className="w-full h-full overflow-hidden object-fill" />
                    </div>
                    <div className="bg-color3 h-[45vh] w-[28%] mb-10 z-20" data-aos="zoom-in" data-aos-duration="1300" style={{ borderTopRightRadius: "50px", borderBottomLeftRadius: "50px" }}>
                        <Image src={machine} alt="organic" style={{ borderTopRightRadius: "50px", borderBottomLeftRadius: "50px" }} className="w-full h-full overflow-hidden object-fill" />
                    </div>
                </div>
                <div className="text-color2 px-10 flex flex-col">
                    <div className="mb-10" data-aos="slide-right" data-aos-duration="1300">
                        <div className="flex mb-3">
                            <h1 className="text-4xl font-black border-2 border-color1 rounded-full w-[5%] ps-3 py-3 me-2">01</h1>
                            <h1 className="text-color1 font-bold text-3xl mt-4">Organic Farming</h1>
                        </div>
                        <div>
                            <p className="mx-20 text-md">Organic farming is a method of agricultural production that excludes the use of synthetic substances, such as pesticides, synthetic medicines or fertilisers, and genetically modified organisms.

                                May be labelled as organic agricultural products, whether processed or unprocessed, which meet the requirements of the European Union regulations on organic production and labelling of organic products or, where applicable, the conditions defined by the specifications approved by order of the minister concerned on the proposal of the National Institute of Origin and Quality (article L641-13 of the rural code)
                                Organic agriculture can be defined as an integrated farming system that strives for sustainability, the enhancement of soil fertility and biological diversity while, with rare exceptions, prohibiting synthetic pesticides, antibiotics, synthetic fertilizers, genetically modified organisms, and growth hormones.</p>
                        </div>
                        <div className="ms-20 mt-5">
                            <button className="border-2 border-color1 px-3 py-1 rounded-md">Explore More</button>
                        </div>
                    </div>
                    <div className="me-auto mb-10" data-aos="slide-left" data-aos-duration="1300">
                        <div className="w-[100%] flex justify-end" >
                            <div className="flex justify-end w-[100%] me-20 mb-3">
                                <h1 className="text-4xl font-black border-2 border-color1 rounded-full w-[5%] ps-2 py-3 me-2">02</h1>
                                <h1 className="text-color1 font-bold text-3xl mt-4 text-right">Irrigation Technique</h1>
                            </div>
                        </div>
                        <div>
                            <p className="mx-20 text-md text-right">Organic farming is a method of agricultural production that excludes the use of synthetic substances, such as pesticides, synthetic medicines or fertilisers, and genetically modified organisms.

                                May be labelled as organic agricultural products, whether processed or unprocessed, which meet the requirements of the European Union regulations on organic production and labelling of organic products or, where applicable, the conditions defined by the specifications approved by order of the minister concerned on the proposal of the National Institute of Origin and Quality (article L641-13 of the rural code)
                                Organic agriculture can be defined as an integrated farming system that strives for sustainability, the enhancement of soil fertility and biological diversity while, with rare exceptions, prohibiting synthetic pesticides, antibiotics, synthetic fertilizers, genetically modified organisms, and growth hormones.</p>
                        </div>
                        <div className="me-20 mt-5 flex justify-end">
                            <button className="border-2 border-color1 px-3 py-1 rounded-md">Explore More</button>
                        </div>
                    </div>
                    <div className="mb-10" data-aos="slide-right" data-aos-duration="1300">
                        <div className="flex mb-3">
                            <h1 className="text-4xl font-black border-2 border-color1 rounded-full w-[5%] ps-2 py-3 me-2">03</h1>
                            <h1 className="text-color1 font-bold text-3xl mt-4">Advanced Machinery</h1>
                        </div>
                        <div>
                            <p className="mx-20 text-md">Organic farming is a method of agricultural production that excludes the use of synthetic substances, such as pesticides, synthetic medicines or fertilisers, and genetically modified organisms.

                                May be labelled as organic agricultural products, whether processed or unprocessed, which meet the requirements of the European Union regulations on organic production and labelling of organic products or, where applicable, the conditions defined by the specifications approved by order of the minister concerned on the proposal of the National Institute of Origin and Quality (article L641-13 of the rural code)
                                Organic agriculture can be defined as an integrated farming system that strives for sustainability, the enhancement of soil fertility and biological diversity while, with rare exceptions, prohibiting synthetic pesticides, antibiotics, synthetic fertilizers, genetically modified organisms, and growth hormones.</p>
                        </div>
                        <div className="ms-20 mt-5">
                            <button className="border-2 border-color1 px-3 py-1 rounded-md">Explore More</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
