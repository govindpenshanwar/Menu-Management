import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    image: {
        type: String,
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    taxApplicability: {
        type: Boolean,
        required: true
    },
    taxNumber: {
        type: Number,
    },
    taxType: {
        type: String,
    }
});

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;