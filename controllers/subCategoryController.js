import subCategory from "../models/SubCategory.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import Category from "../models/Category.js";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createSubCategory = async (req, res) => {
    try {
        const { category } = req.body;
        const image = req.file;

        if (!image) {
            return res.status(400).json({ error: "No picture uploaded" });
        }

        const categoryName = await Category.findOne({
            name: category
        })
        if (!categoryName) {
            return res.status(400).
                json({ error: "Category Does not exists..." });
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

                    const newSubCategory = new subCategory({
                        ...req.body,
                        image: cloudinaryUrl,
                    });
                    await newSubCategory.save();
                    return res.json({
                        success: true,
                        message: "Subcategory created successfully",
                    });
                }
            )
            .end(image.buffer);
    } catch (error) {
        return res.json({
            success: false,
            error: error.message,
        });
    }
};

export const getSubCategories = async (req, res) => {
    try {
        const subCategories = await subCategory.find().populate("category");
        return res.json({
            success: true,
            subCategories,
        });
    } catch (error) {
        return res.json({
            success: false,
            error: error.message,
        });
    }
};

export const getSubCategoriesByCategory = async (req, res) => {
    try {
        const { categoryName } = req.params;

        const subCategories = await subCategory.find({
            category: categoryName,
        });
        if (subCategories.length === 0) {
            return res.json({
                success: false,
                message: "Category does not exists.."
            })
        }
        return res.json({
            success: true,
            subCategories,
        });
    } catch (error) {
        return res.json({
            success: false,
            error: error.message,
        });
    }
};

export const getSubcategoryById = async (req, res) => {
    try {
        const SubCategory = await subCategory
            .findById(req.params.id)
            .populate("category");
        if (!subCategory) {
            return res.status(404).json({
                success: false,
                message: "no subcategory found",
            });
        }

        return res.json({
            success: true,
            SubCategory,
        });
    } catch (error) {
        return res.json({
            success: false,
            error: error.message,
        });
    }
};

export const getSubCategoryByName = async (req, res) => {
    try {
        const categoryName = await subCategory.findOne({
            name: req.params.name,
        });
        if (!categoryName) {
            return res.json({
                success: false,
                message: "category not found",
            });
        }

        return res.json({
            success: true,
            categoryName,
        });
    } catch (error) {
        return res.json({
            success: false,
            error: error.message,
        });
    }
};
export const updateSubCategory = async (req, res) => {
    try {
        const SubCategory = await subCategory.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        return res.json({
            success: true,
            message: "Sub Category updated Successfully",
            SubCategory,
        });
    } catch (error) {
        return res.json({
            success: false,
            error: error.message,
        });
    }
};

export const deleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.json({
                success: false,
                message: "No SubCategory with given id found"
            })
        }
        const deletedCategory = await subCategory.findByIdAndDelete(id);
        return res.json({
            success: true,
            message: "SubCategory Deleted Successfully"
        })

    } catch (error) {
        return res.json({
            success: false,
            error: error.message
        })
    }
}