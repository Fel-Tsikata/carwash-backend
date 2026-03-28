// createBooking(data)

// getAllBookings()

// getBookingById(id)

// updateBookingStatus(id, status)

// deleteBooking(id)

// What it does:

// Talks to Booking model

// Can calculate total price

// Can validate time slots

// Can populate service reference
const Booking = require("../models/booking.model");
const Service = require("../models/service.model");

const createBooking = async(data) => {
    const service = await Service.findById(data.service);

    if(!service){
        throw new Error("Service not found");
    }

    if(!service.isAvailable){
        throw new Error("Service is currently unavailable");
    }
    const existingBooking = await Booking.findOne({
        bookingDate: data.bookingDate,
        timeSlot: data.timeSlot,
        status: {$ne: "cancelled"} //status is not cancelled
    });

    if(existingBooking){
        throw new Error("This time slot is already booked");
    }
    const totalPrice = service.price;

    const booking = await booking.create({
        firstName: data.firstName,
        lastName: data.lastName,
        customerPhone: data.customerPhone,
        vehicleType: data.vehicleType,
        service: data.service,
        bookingDate: data.bookingDate,
        timeSlot: data.timeSlot,
        notes: data.notes,
        totalPrice: totalPrice
    });
    return booking;
};
const getAllBookings = async() => {
    const bookings = await Booking
    .find()
    .populate("service")
    .sort({createdAt: -1});

    return bookings;

};
const getBookingById = async(id) => {
    const booking = await Booking
    .findByID(id)
    .populate("service");

    if(!booking){
        throw new Error("Booking not found");
    }

    return booking;
};
const updateBookingStatus = async(id,status) =>{
    const allowedStatuses = ["pending", "confirmed", "completed", "cancelled"];

    if (!allowedStatuses.includes(status)) {
        throw new Error("Invalid booking status");
    }

    const booking = await Booking.findById(id);
    if(!booking){
        throw new Error ("Booking not found");
    }
    const updatedStatus = await Booking.findByIdAndUpdate(id,
        {status: status},
        {new: true}
    );
    return updatedStatus;
};
const updateBooking = async(id,data) =>{
    const booking = await Booking.findById(id);
    if(!booking){
        throw new Error ("Booking not found");
    }
     if (data.service) {
        const service = await Service.findById(data.service);

        if (!service) {
            throw new Error("Service not found");
        }

        data.totalPrice = service.price;
    }
     // Check if time slot is already taken (if date or slot is being updated)
    if (data.bookingDate || data.timeSlot) {
        const existingBooking = await Booking.findOne({
            bookingDate: data.bookingDate || booking.bookingDate,
            timeSlot: data.timeSlot || booking.timeSlot,
            status: { $ne: "cancelled" },
            _id: { $ne: id }
        });

        if (existingBooking) {
            throw new Error("Time slot already booked");
        }
    }
    const updatedBooking = await Booking.findByIdAndUpdate(
        id,
        data,
        {new: true}
    );
    return updatedBooking;
};
const deleteBooking = async(id) =>{
    const deletedBooking = await Booking.findByIdAndDelete(id);
        if(!deletedBooking){
            throw new Error("Booking not found");
        }
        return deletedBooking;
};
const getBookingsByDate = async (date) => {

    const bookings = await Booking.find({
        bookingDate: date,
        status: { $ne: "cancelled" }
    }).populate("service");

    return bookings;
};
const getBookingsByStatus = async (status) => {

    const allowedStatuses = ["pending", "confirmed", "completed", "cancelled"];

    if (!allowedStatuses.includes(status)) {
        throw new Error("Invalid booking status");
    }

    const bookings = await Booking.find({
        status: status
    }).populate("service");

    return bookings;
};




module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBookingStatus,
    updateBooking,
    deleteBooking,
    getBookingsByDate,
    getBookingsByStatus
};