import axios from "axios";
import { useState, type FormEvent, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

const BookingPage = () => {
  const token = localStorage.getItem("token");
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  
  const [phone, setPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isLoadingService, setIsLoadingService] = useState(true);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Get max date (30 days from now)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  // Fetch service details
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setIsLoadingService(true);
        const { data } = await axios.get(`/api/service/${serviceId}`);
        if (data.success) {
          setSelectedService(data.service);
        }
      } catch (error) {
        console.error("Failed to fetch service details", error);
      } finally {
        setIsLoadingService(false);
      }
    };
    
    if (serviceId) {
      fetchServiceDetails();
    }
  }, [serviceId]);

  // Function to generate time slots (every 60 minutes from 9 AM to 6 PM)
  
  const generateTimeSlots = (start: number, end: number) => {
    const slots: string[] = [];
    for (let hour = start; hour <= end; hour++) {
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const formattedHour = displayHour < 10 ? `0${displayHour}` : displayHour;
      slots.push(`${formattedHour}:00 ${ampm}`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots(9, 18);

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!phone || !bookingDate || !bookingTime) {
      toast.error("Please fill all fields");
      return;
    }

    if (!token) {
      toast.error("Please login to book a service");
      navigate("/login");
      return;
    }

    if (phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    try {
      setIsLoading(true);
      
      const { data } = await axios.post(
        `/api/booking/${serviceId}/add`,
        {
          phone,
          bookingDate,
          bookingTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(`Booking confirmed for ${bookingDate} at ${bookingTime}`);
        setTimeout(() => {
          navigate("/myBooking");
        }, 1500);
      } else {
        toast.error(data.message || "Booking failed");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingService) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-purple-50/30">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-500">Loading service details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-purple-500/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 sm:w-8 h-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-full" />
              <span className="text-xs sm:text-sm uppercase tracking-wider text-primary/80 font-semibold">Book Appointment</span>
              <div className="w-6 sm:w-8 h-0.5 bg-gradient-to-r from-purple-600 to-primary rounded-full" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Book Your Service
            </span>
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-2">Fill in the details below to confirm your appointment</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Service Details Card */}
          {selectedService && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 order-2 md:order-1">
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src={selectedService.image}
                  alt={selectedService.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-primary to-purple-600 text-white text-[10px] sm:text-xs font-semibold rounded-full">
                    {selectedService.category}
                  </span>
                </div>
              </div>
              
              <div className="p-4 sm:p-5">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{selectedService.name}</h2>
                <p className="text-gray-500 text-xs sm:text-sm mb-4 line-clamp-2">{selectedService.description}</p>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1 sm:gap-2 text-gray-600">
                    <span className="text-sm sm:text-base">⏱️</span>
                    <span className="text-xs sm:text-sm">{selectedService.duration} {parseFloat(selectedService.duration) > 1 ? "hrs" : "hr"}</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    ৳ {selectedService.price?.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Booking Form */}
          <form
            onSubmit={onSubmitHandler}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 order-1 md:order-2"
          >
            <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 px-4 sm:px-6 py-4 sm:py-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-sm sm:text-base">📅</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">Appointment Details</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Fill in your information</p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center gap-1">
                    <span>📞</span> Mobile Number
                  </span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your mobile number"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                />
                <p className="text-xs text-gray-400 mt-1">We'll send confirmation to this number</p>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center gap-1">
                    <span>📆</span> Select Date
                  </span>
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  min={today}
                  max={maxDateStr}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                />
                <p className="text-xs text-gray-400 mt-1">Book up to 30 days in advance</p>
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center gap-1">
                    <span>⏰</span> Select Time
                  </span>
                </label>
                <select
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                >
                  <option value="">-- Select a time slot --</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-400 mt-1">Available: 9:00 AM - 6:00 PM</p>
              </div>

              {/* Booking Summary */}
              {bookingDate && bookingTime && (
                <div className="bg-gradient-to-r from-primary/5 to-purple-600/5 rounded-xl p-3 sm:p-4 border border-primary/10">
                  <p className="text-xs text-primary font-semibold mb-2">📋 Booking Summary</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date:</span>
                      <span className="font-medium text-gray-700">{bookingDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Time:</span>
                      <span className="font-medium text-gray-700">{bookingTime}</span>
                    </div>
                    {selectedService && (
                      <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                        <span className="text-gray-500">Total:</span>
                        <span className="font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                          ৳ {selectedService.price?.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="relative overflow-hidden group w-full bg-gradient-to-r from-primary to-purple-600 text-white font-semibold py-2.5 sm:py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-sm sm:text-base">
                  {isLoading ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      ✅ Confirm Booking
                      <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              {/* Terms */}
              <p className="text-center text-[10px] sm:text-xs text-gray-400">
                By confirming, you agree to our{" "}
                <button type="button" className="text-primary hover:underline">
                  Terms & Conditions
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default BookingPage;