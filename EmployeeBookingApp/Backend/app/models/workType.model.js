module.exports = mongoose => {
    const workTypeSchema = new mongoose.Schema({
        workType: { type: String, required: true, unique: true },
    });

    workTypeSchema.method("toJSON", function () {
        const { __v, _id, confirmPassword, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const WorkType = mongoose.model('WorkType', workTypeSchema);
    return WorkType;
};