'use client';
import { useEffect, useState } from 'react';
import '../../css/schemes.css';
import Image from 'next/image';
import schemaImg1 from '../../../public/assets/images/1.jpg';
import schemaImg2 from '../../../public/assets/images/2.jpeg';
import schemaImg3 from '../../../public/assets/images/3.jpeg';
import schemaImg4 from '../../../public/assets/images/4.jpeg';
import schemaImg5 from '../../../public/assets/images/5.jpeg';
import schemaImg6 from '../../../public/assets/images/6.webp';
import schemaImg7 from '../../../public/assets/images/7.png';
import schemaImg8 from '../../../public/assets/images/8.webp';
import schemaImg9 from '../../../public/assets/images/9.png';
import schemaImg10 from '../../../public/assets/images/10.jpg';
import schemaImg11 from '../../../public/assets/images/11.jpg';
import schemaImg12 from '../../../public/assets/images/12.png';
import schemaImg13 from '../../../public/assets/images/13.webp';
import schemaImg14 from '../../../public/assets/images/14.jpeg';
import schemaImg15 from '../../../public/assets/images/15.png';

export default function Schemes() {
    const [schemes, setSchemes] = useState<any[]>([]);
    const getAllSchemes = async () => {
        try {
            const response = await fetch("/api/scheme");
            const data = await response.json();
            console.log(data);  // Ensure it's an array or contains an array
            setSchemes(data.data); // Adjust this depending on the response structure
        } catch (error) {
            console.error("Error fetching schemes:", error);
        }
    };


    useEffect(() => {
        getAllSchemes();
    }, []);

    return (
        <main className="main h-screen">
            {Array.isArray(schemes) && schemes.map((scheme: any, index: any) => (
                <section key={index} className="card-area mb-52">
                    <section className="card-section">
                        <div className="card">
                            <div className="flip-card">
                                <div className="flip-card__container">
                                    <div className="card-front">
                                        <div className="card-front__tp card-front__tp--camping ">
                                            <Image
                                                src={schemaImg1}
                                                alt={scheme.name}
                                                width={300}
                                                height={300}
                                            />
                                        </div>
                                        <div className="card-front__bt">
                                            <p className="card-front__text-view card-front__text-view--camping">
                                                {scheme.name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="card-back">
                                    </div>
                                </div>
                            </div>

                            <div className="inside-page">
                                <div className="inside-page__container">
                                    <h3 className="inside-page__heading inside-page__heading--camping">
                                        {scheme.schemeName}
                                    </h3>
                                    <p className="inside-page__text text-xs">
                                        {scheme.schemeDescription}
                                    </p>
                                    <button className="inside-page__btn inside-page__btn--camping text-sm">View deals</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            ))}
        </main>
    );
}
