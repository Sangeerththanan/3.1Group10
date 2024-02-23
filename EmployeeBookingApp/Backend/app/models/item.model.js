module.exports = mongoose => {
    const itemSchema = new mongoose.Schema({
        type: { type: String , required: true},
        item: { type: String , required: true},
        cost: { type: Number , required: true},
    });


    const Items = mongoose.model('Items', itemSchema);
    return Items;
};