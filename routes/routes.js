import express from "express";
import connect from "../DBConfig/DbConfig.js";
import {
    createCategory,
    deleteCategory,
    getAll,
    getCategories,
    getCategoryById,
    getCategoryByName,
    updateCategory,
} from "../controllers/categoryController.js";
import {
    createSubCategory,
    deleteSubCategory,
    getSubCategories,
    getSubCategoriesByCategory,
    getSubCategoryByName,
    getSubcategoryById,
    updateSubCategory,
} from "../controllers/subCategoryController.js";
import {
    createItem,
    deleteItem,
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
router.delete("/categories/:id", deleteCategory)

//subCategory Routes
router.post("/subcategories", upload.single('image'), createSubCategory);
router.get("/subcategories", getSubCategories);
router.get("/subcategories/:name", getSubCategoryByName);
router.get("/subcategories/category/:categoryName", getSubCategoriesByCategory);
router.get("/subcategories/:id", getSubcategoryById);
router.put("/subcategories/:id", upload.single('image'), updateSubCategory);
router.delete("/subcategories/:id", deleteSubCategory);


//Items Routes
router.get("/items/search", searchItem);
router.post("/items", upload.single('image'), createItem);
router.get("/items", getItems);
// router.get("/items/category/:id", getItemByCategory);
router.get("/items/category/:categoryName", getItemByCategory);
// router.get("/items/subcategory/:id", getItemBySubCategory);
router.get("/items/subcategory/:subCategoryName", getItemBySubCategory);
router.get('/items/:id', getItemById);
router.put("/items/:id", upload.single('image'), updateItem);
router.delete("/items/:id", deleteItem);
connect();
export default router;
