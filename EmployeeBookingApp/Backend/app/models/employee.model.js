const bcrypt = require('bcrypt');

module.exports = mongoose => {
    const employeeSchema = new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        //confirmPassword: { type: String, required: true },
        contactNo: { type: String, required: true },
        address: { type: String, required: true },
        workType: { type: String, required: true },
        payment: { type: Number, required: true }
    });

    employeeSchema.method("toJSON", function () {
        const { __v, _id, confirmPassword, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    // Define comparePassword method on the schema
    employeeSchema.methods.comparePassword = async function (candidatePassword) {
        try {
            return await bcrypt.compare(candidatePassword, this.password);
        } catch (error) {
            throw error;
        }
    };

    const Employee = mongoose.model('Employee', employeeSchema);
    return Employee;
};