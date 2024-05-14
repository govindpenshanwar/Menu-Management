import Category from "../models/Category.js";
import Item from "../models/Items.js";
import subCategory from "../models/SubCategory.js";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getAll = async (req, res) => {
    try {
        return res.json({
            message: "Server is up and ruuning",
            success: true
        })
    } catch (error) {
        return res.json({
            error: error.message,
            success: false
        })
    }
};

export const createCategory = async (req, res) => {
    try {
        const image = req.file;

        if (!image) {
            return res.status(400).json({ error: "No picture uploaded" });
        }

        const result = await cloudinary.uploader
            .upload_stream(
                {
                    resource_type: "auto",
                },
                async (error, result) => {
                    if (error) {
                        console.error("Error uploading image to Cloudinary:", error);
                        return res.status(500).json({
                            error: "Failed to upload image to Cloudinary",
                            success: false,
                        });
                    }

                    const cloudinaryUrl = result.url;

                    const newCategory = new Category({
                        ...req.body,
                        image: cloudinaryUrl
                    })
                    await newCategory.save();
                    return res.json({
                        success: true,
                        message: "Category created successfully"
                    });
                }
            )
            .end(image.buffer);
    } catch (error) {
        return res.json({
            success: false,
            error: error.message
        })
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.json({
            success: true,
            categories
        });

    } catch (error) {
        return res.json({
            success: false,
            error: error.message
        })
    }
}

export const getCategoryByName = async (req, res) => {
    try {
        const categoryName = await Category.findOne({
            name: req.params.catName
        })
        if (!categoryName) {
            return res.json({
                success: false,
                message: "category not found"
            });
        }

        return res.json({
            success: true,
            categoryName
        })
    } catch (error) {
        return res.json({
            success: false,
            error: error.message
        })
    }
}

export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.json({
                success: false,
                error: "no category with id found"
            })
        };

        const SubCategory = await subCategory.find({
            category: category._id
        });
        const Items = await Item.find({
            category: category._id
        });

        return res.json({
            success: true,
            category, SubCategory, Items
        })

    } catch (error) {
        return res.json({
            success: false,
            error: error.message
        })
    }
};

export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!category) {
            return res.json({
                success: false,
                error: "no category found"
            });
        };

        return res.json({
            success: true,
            message: "category updated successfully",
            category
        })

    } catch (error) {
        return res.json({
            success: false,
            error: error.message
        })
    }
}