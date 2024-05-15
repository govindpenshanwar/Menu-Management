import express from "express";
import connect from "../DBConfig/DbConfig.js";
import {
    createCategory,
    getAll,
    getCategories,
    getCategoryById,
    getCategoryByName,
    updateCategory,
} from "../controllers/categoryController.js";
import {
    createSubCategory,
    getSubCategories,
    getSubCategoriesByCategory,
    getSubCategoryByName,
    updateSubCategory,
} from "../controllers/subCategoryController.js";
import {
    createItem,
    getItemByCategory,
    getItemById,
    getItemBySubCategory,
    getItems,
    searchItem,
    updateItem,
} from "../controllers/ItemController.js";
import upload from "../multer/multer.js";

const router = express.Router();
router.get("/", getAll);

//category routes
router.post("/categories", upload.single('image'), createCategory);
router.get("/categories", getCategories);
router.get("/categories/name/:catName", getCategoryByName);
router.get("/categories/:id", getCategoryById);
router.put("/categories/:id", updateCategory);


//subCategory Routes
router.post("/subcategories", upload.single('image'), createSubCategory);
router.get("/subcategories", getSubCategories);
router.get("/subcategories/:name", getSubCategoryByName);
router.get("/subcategories/category/:id", getSubCategoriesByCategory);
router.put("/categories/:id", updateSubCategory);

//Items Routes
router.get("/items/search", searchItem);
router.post("/items", upload.single('image'), createItem);
router.get("/items", getItems);
router.get("/items/category/:id", getItemByCategory);
router.get("/items/subcategory/:id", getItemBySubCategory);
router.get('/items/:id', getItemById);
router.put("/items/:id", updateItem);

connect();
export default router;
