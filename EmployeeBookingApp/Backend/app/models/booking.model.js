module.exports = mongoose => {
    const bookingchema = new mongoose.Schema({
        ERemail: { type: String , required: true},
        employer: { type: String , required: true},
        type: { type: String , required: true},
        employee: { type: String , required: true},
        EEemail: { type: String , required: true},
    });


    const Booking = mongoose.model('Booking', bookingchema);
    return Booking;
};
