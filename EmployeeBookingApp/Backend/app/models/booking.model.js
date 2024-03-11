module.exports = mongoose => {
    const bookingchema = new mongoose.Schema({
        employer: { type: String , required: true},
        type: { type: String , required: true},
        employee: { type: String , required: true},
    });


    const Booking = mongoose.model('Booking', bookingchema);
    return Booking;
};