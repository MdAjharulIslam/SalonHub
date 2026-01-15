import axios from "axios";
import React, { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const BookingPage = () => {
    const token = localStorage.getItem("token");
  const { serviceId } = useParams<{ serviceId: string }>();
  const [phone, setPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  // Function to generate time slots (every 60 minutes from 9 AM to 6 PM)
  const generateTimeSlots = (start: number, end: number, interval: number) => {
    const slots: string[] = [];
    for (let hour = start; hour <= end; hour++) {
      for (let min = 0; min < 60; min += interval) {
        const h = hour < 10 ? `0${hour}` : hour;
        const m = min === 0 ? "00" : min;
        slots.push(`${h}:${m}`);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots(9, 18, 60); 

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!phone || !bookingDate || !bookingTime) {
      toast.error("Please fill all fields");
      return;
    }

    try {
     
      const { data } = await axios.post(`/api/booking/${serviceId}/add`, {
        phone,
        bookingDate,
        bookingTime,
      },
       {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  }
    )

      if (data.success) {
        toast.success(`Booking confirmed for ${bookingDate} at ${bookingTime}`);
        
        setPhone("");
        setBookingDate("");
        setBookingTime("");
      } else {
        toast.error(data.message || "Booking failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={onSubmitHandler}
        className="border w-full max-w-md bg-white rounded-2xl shadow-lg p-6"
      >
        <h1 className="text-primary text-3xl text-center mb-6">
          Booking a Service
        </h1>

       
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="phone">Mobile Number:</label>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter mobile number"
            className="border border-primary rounded-xl outline-none p-2"
          />
        </div>

   
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="date">Select Date:</label>
          <input
            type="date"
            name="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            className="border border-primary rounded-xl outline-none p-2"
          />
        </div>

      
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="time">Select Time:</label>
          <select
            name="time"
            value={bookingTime}
            onChange={(e) => setBookingTime(e.target.value)}
            className="border border-primary rounded-xl outline-none p-2"
          >
            <option value="">-- Select a time slot --</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

       
        <button
          type="submit"
          className="text-white bg-primary p-3 rounded-xl w-full mt-4 hover:bg-primary-dark transition"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
