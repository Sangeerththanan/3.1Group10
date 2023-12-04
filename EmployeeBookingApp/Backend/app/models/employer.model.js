const bcrypt = require('bcrypt');

module.exports = mongoose => {
    const employerSchema = new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        //confirmPassword: { type: String, required: true },
        contactNo: { type: String, required: true },
        address: { type: String, required: true },
    });

    employerSchema.method("toJSON", function () {
        const { __v, _id, confirmPassword, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    // Define comparePassword method on the schema
    employerSchema.methods.comparePassword = async function (candidatePassword) {
        try {
            return await bcrypt.compare(candidatePassword, this.password);
        } catch (error) {
            throw error;
        }
    };

    const Employer = mongoose.model('Employer', employerSchema);
    return Employer;
};