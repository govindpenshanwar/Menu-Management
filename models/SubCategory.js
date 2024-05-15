import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
        default: false
    },
    tax: {
        type: Number
    },
    // category: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Category",
    //     required: true,
    // },
    category: {
        type: String,
        required: true,
    },
});

const subCategory = mongoose.models.subCategory || mongoose.model('SubCategory', subCategorySchema)

export default subCategory;