module.exports = mongoose => {
    const complainSchema = new mongoose.Schema({
        email: { type: String, required: true },
        title: { type: String, required: true },
        details: { type: String, required: true },
    });

    complainSchema.method("toJSON", function () {
        const { __v, _id, confirmPassword, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Complain = mongoose.model('Complain', complainSchema);
    return Complain;
};