'use client'
import { useState } from 'react';
import '../../css/booking.css';
import { useRouter } from 'next/navigation';

export default function Booking() {
    const yard = ["yard first", "yard second", "yard third", "yard fourth"];
    const [selectedYard, setSelectedYard] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [paymentMethod, setPaymentMethod] = useState(''); // State for payment method
    const router = useRouter();

    const bookingdetails = {
        email: "",
        market_yard: "",
        booking_date: "",
        booking_timeslot: "",
        goods_type: "",
        quantity: "",
        status: ""
    }

    const inputHandler = (e: any) => {
        const { name, value } = e.target;
        setBooking({ ...booking, [name]: value });
    }

    const [booking, setBooking] = useState(bookingdetails);

    const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(e.target.value);
    };

    const registerBooking = async () => {
        try {
            const response = await fetch("/api/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: booking.email, market_yard: "",
                    booking_date: booking.booking_date,
                    booking_timeslot: booking.booking_timeslot,
                    goods_type: booking.goods_type,
                    quantity: booking.quantity,
                    status: "pending"
                })
            });
            const data = await response.json();
            console.log(data);
            if (data.success) {
                router.push('/');
                console.log("Booking registered successfully");
            } else {
                alert("error");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="bg-color3 p-10 flex flex-col">
            <div className='border-2 p-5 rounded-xl grow'>
                <div className='ps-16 pe-8'>
                    <div className='font-bold text-2xl py-5'>Booking Details</div>
                    <div className='p-2 flex items-center'>
                        <label className='text-color1 font-bold text-lg pe-3'>Email Address  : </label>
                        <input type='text' name='email' className='bg-transparent border-b-2 outline-none flex-1' onChange={inputHandler}></input>
                    </div>
                    <div className='p-2 flex items-center'>
                        <label className='text-color1 font-bold text-lg pe-3'>Yard Location : </label>
                        <select
                            className='bg-color1 rounded px-3 py-1'
                            name="market_yard"
                            value={selectedYard}
                            onChange={(e) => {
                                setSelectedYard(e.target.value);
                                inputHandler(e);
                            }}
                        >
                            {yard.map((yard, index) => (
                                <option key={index} value={yard} className='rounded px-3 py-1'>
                                    {yard}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='p-2 flex items-center'>
                        <label className='text-color1 font-bold text-lg pe-3'>Date of Booking : </label>
                        <input type='text' name='booking_date' className='bg-transparent border-b-2 outline-none flex-1' onChange={inputHandler}></input>
                    </div>
                    <div className='p-2 flex items-center'>
                        <label className='text-color1 font-bold text-lg pe-3'>Booking Timeslot : </label>
                        <select
                            className='bg-color1 rounded px-3 py-1'
                            name="booking_timeslot"
                            value={selectedTime}
                            onChange={(e) => {
                                setSelectedTime(e.target.value);
                                inputHandler(e);
                            }}
                        >
                            <option value="8:00 AM - 10:00 AM" className='rounded px-3 py-1'>8:00 AM - 10:00 AM</option>
                            <option value="10:30 AM - 12:30 PM" className='rounded px-3 py-1'>10:30 AM - 12:30 PM</option>
                            <option value="3:00 PM - 5:00 PM" className='rounded px-3 py-1'>3:00 PM - 5:00 PM</option>
                            <option value="5:30 PM - 7:30 PM" className='rounded px-3 py-1'>5:30 PM - 7:30 PM</option>
                        </select>
                    </div>
                    <div className='p-2 flex items-center'>
                        <label className='text-color1 font-bold text-lg pe-3'>Goods Type : </label>
                        <input type='text' name='goods_type' className='bg-transparent border-b-2 outline-none flex-1' onChange={inputHandler}></input>
                    </div>
                    <div className='p-2 flex items-center'>
                        <label className='text-color1 font-bold text-lg pe-3'>Quantity : </label>
                        <input type='text' name='quantity' className='bg-transparent border-b-2 outline-none flex-1' onChange={inputHandler}></input>
                    </div>
                    <div className='p-2 flex items-center'>
                        <label className='text-color1 font-bold text-lg pe-3'>Status : </label>
                        <input type='text' name='status' className='bg-transparent border-b-2 outline-none flex-1' onChange={inputHandler}></input>
                    </div>
                </div>
                <div className='flex ps-16 pe-8 mt-10'>
                    <div>
                        <div className='font-bold text-2xl'>Payment Method</div>
                        <div className='p-2 flex flex-col'>
                            <label className='flex items-center'>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Credit/Debit/ATM card"
                                    checked={paymentMethod === "Credit/Debit/ATM card"}
                                    onChange={handlePaymentMethodChange}
                                    className="mr-2"
                                />
                                Credit / Debit / ATM card
                            </label>
                            <label className='flex items-center'>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Net Banking"
                                    checked={paymentMethod === "Net Banking"}
                                    onChange={handlePaymentMethodChange}
                                    className="mr-2"
                                />
                                Net Banking
                            </label>
                            <label className='flex items-center'>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Cash on Delivery"
                                    checked={paymentMethod === "Cash on Delivery"}
                                    onChange={handlePaymentMethodChange}
                                    className="mr-2"
                                />
                                Cash on Delivery
                            </label>
                        </div>
                    </div>
                </div>
                <div className='ps-16 pe-8 mt-10'>
                    <button onClick={() => {
                        console.log(booking, paymentMethod);
                        registerBooking();
                    }} className="rounded-md bg-color5 border border-color4 px-3 py-2">Submit <i className="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        </div>
    );
}
