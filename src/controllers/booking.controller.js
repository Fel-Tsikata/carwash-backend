const { 
    createBooking,
    getAllBookings,
    getBookingById,
    updateBookingStatus,
    updateBooking,
    deleteBooking,
    getBookingsByDate,
    getBookingsByStatus} = require("../services/booking.service")

const createBookingHandler = async(req,res) => {
    try{
        const booking = await createBooking(req.body);
        res.status(201).json(booking);
    }catch(error){
        res.status(400).json({
            message: error.message 
        });
    }
};

const getBookingsHandler = async (req, res) => {
    try {

        const { status, date } = req.query;

        let bookings;

        if (status) {
            bookings = await getBookingsByStatus(status);
        } 
        else if (date) {
            bookings = await getBookingsByDate(date);
        } 
        else {
            bookings = await getAllBookings();
        }

        res.status(200).json(bookings);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const getBookingByIdHandler = async(req,res) => {
    const id = req.params.id;
    try{
        const booking = await getBookingById(id);
         res.status(200).json({
            status: "success",
            data: booking
        });
    }catch(error){
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};
const updateBookingStatusHandler = async(req,res) => {
    const id = req.params.id;
    const {status} = req.body;
    try{
        const updatedBooking = await updateBookingStatus(id, status);
        res.status(200).json({
            status: "success",
            data: updatedBooking
        });
    }catch(error){
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};
const updateBookingHandler = async (req, res) => {
    const id = req.params.id;

    try {

        const updatedBooking = await updateBooking(id, req.body);

        res.status(200).json({
            status: "success",
            data: updatedBooking
        });

    } catch (error) {

        res.status(500).json({
            status: "error",
            message: error.message
        });

    }
};
const deleteBookingHandler = async(req,res) => {
    const id = req.params.id;
    try{
        await deleteBooking(id);
        res.status(204).send();
        
    }catch(error){
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }   
};



module.exports = {
    createBookingHandler,
    getBookingsHandler,
    getBookingByIdHandler,
    updateBookingStatusHandler,
    updateBookingHandler,
    deleteBookingHandler
}