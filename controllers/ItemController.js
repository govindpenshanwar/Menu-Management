import Item from "../models/Items.js"

import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createItem = async (req, res) => {
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

                    const newItem = new Item({
                        ...req.body,
                        image: cloudinaryUrl
                    })
                    await newItem.save();
                    return res.json({
                        success: true,
                        message: "Item added successfully"
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

export const getItems = async (req, res) => {
    try {
        const allItems = await Item.find().populate('category').populate('subCategory');
        return res.json({
            success: true,
            allItems
        })
    } catch (error) {
        return res.json({
            success: false,
            error: error.message
        })
    }
}

export const getItemByCategory = async (req, res) => {
    try {
        const itemByCategory = await Item.find({
            category: req.params.id
        }).populate('category').populate('subCategory');

        return res.json({
            success: true,
            itemByCategory
        })

    } catch (error) {
        return res.json({
            success: false,
            error: error.message
        })
    }
}
export const getItemBySubCategory = async (req, res) => {
    try {
        const itemBySubCategory = await Item.find({
            subCategory: req.params.id
        }).populate('category').populate('subCategory');

        return res.json({
            success: true,
            itemBySubCategory
        })

    } catch (error) {
        return res.json({
            success: false,
            error: error.message
        })
    }
}

export const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate('category').populate('subCategory');
        if (!item) {
            return res.json({
                success: false,
                message: "No item Found"
            })
        };

        return res.json({
            success: true,
            item
        })

    } catch (error) {
        return res.json({
            success: false,
            error: error.message
        })
    }
}

export const updateItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) {
            return res.json({
                success: false,
                message: "No item Found"
            })
        }
        return res.json({
            success: true,
            message: "Item updated",
            item
        })
    } catch (error) {
        return res.json({
            success: false,
            error: error.message
        })
    }
};

export const searchItem = async (req, res) => {
    try {
        const items = await Item.find({
            name: new RegExp(req.query.name, 'i')
        }).populate('category').populate('subCategory');

        return res.json({
            success: true,
            items
        })

    } catch (error) {
        return res.json({
            success: false,
            error: error.message
        })
    }
}

export const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.json({
                success: false,
                message: "No Item with given id found"
            })
        }
        const deletedItem = await Item.findByIdAndDelete(id);
        return res.json({
            success: true,
            message: "Item Deleted Successfully"
        });

    } catch (error) {
        return res.json({
            success: false,
            error: error.message
        })
    }
}