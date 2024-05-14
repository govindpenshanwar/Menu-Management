import mongoose from "mongoose";

const itemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    image: {
        type: String
    },
    description: {
        type: String,
        required: [true, "description is required"]
    },
    taxApplicability: {
        type: Boolean,
        required: true
    },
    tax: {
        type: Number
    },
    baseAmount: {
        type: Number,
        required: [true, "base amount is required"]
    },
    discount: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    }
});

itemsSchema.pre('save', function (next) {
    this.totalAmount = this.baseAmount - this.discount;
    next();
});

itemsSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    // if (update.baseAmount !== undefined && update.discount !== undefined) {
    //     update.totalAmount = update.baseAmount - update.discount;
    // } else if (update.baseAmount !== undefined) {
    //     update.totalAmount = update.baseAmount - (this.discount || 0);
    // } else if (update.discount !== undefined) {
    //     update.totalAmount = (this.baseAmount || 0) - update.discount;
    // }
    update.totalAmount = update.baseAmount - update.discount
    next();
});

const Item = mongoose.models.Item || mongoose.model('Item', itemsSchema);
export default Item;