import Booking from "../models/Booking.js";

export const addBooking = async (req, res) => {
  try {
    const userId = req.userId;
    const { serviceId } = req.params;
    const { phone, bookingDate, bookingTime } = req.body;

    if (!userId) {
      return res.json({
        success: false,
        message: "User Not found or Unauthorized access",
      });
    }

    if (!serviceId) {
      return res.json({
        success: false,
        message: "Service not found",
      });
    }

    if (!phone || !bookingDate || !bookingTime) {
      return res.json({
        success: false,
        message: "All field are required",
      });
    }

    const newBooking = await Booking.create({
      customer: userId,
      service: serviceId,
      phone,
      bookingDate,
      bookingTime,
    });

    return res.json({
      success: true,
      message: "Booking Added Successfully",
      newBooking,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "internal server error",
    });
  }
};

export const getAllBooking = async (req, res) => {
  try {
    const allBooking = await Booking.find()
      .populate("customer", "name email")
      .populate("service").sort({ createdAt: -1 });;

    if (allBooking.length === 0) {
      return res.json({
        success: false,
        message: "no booking available",
      });
    }

    return res.json({
      success: true,
      allBookings: allBooking.length,
      allBooking,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "internal server error",
    });
  }
};

export const getBookingByUser = async (req, res) => {
  try {
    const userId = req.userId;

    const booking = await Booking.find({ customer: userId }).populate("service").sort({ createdAt: -1 });
    if (booking.length === 0) {
      return res.json({
        success: false,
        message: "No Booking Found",
      });
    }

    return res.json({
      success: true,
      bookings: booking.length,
      booking,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "internal server error",
    });
  }
};

export const manageBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    if (!bookingId) {
      return res.json({
        success: false,
        message: "no bookingId found",
      });
    }

    const changeStatus = await Booking.findByIdAndUpdate(
      { _id: bookingId },
      { status },
      { new: true }
    );

    return res.json({
      success: true,
      changeStatus,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "internal server error",
    });
  }
};


//by user
export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.userId;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.customer.toString() !== userId) {
      return res.json({
        success: false,
        message: "Unauthorized action",
      });
    }

    if (booking.status !== "Pending") {
      return res.json({
        success: false,
        message: `Cannot cancel a booking with status "${booking.status}"`,
      });
    }

    booking.status = "Cancelled";
    await booking.save();

    return res.json({
      success: true,
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    console.error("Cancel booking error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
