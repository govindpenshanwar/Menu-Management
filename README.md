# Menu Management System

This is a Node.js backend server for managing a menu system. The menu is divided into three parts in the following order:

1. Category
2. Sub Category: A category can have multiple sub-categories
3. Items: A subcategory can have multiple items in it

## Features

- Create, read, update, and delete categories, subcategories, and items.
- Search for items by name.
- Calculate total amount for items considering base amount and discount.

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/govindpenshanwar/Menu-Management.git
   cd menu-management
   ```

## Running the Project

To start the server, run:

```bash
npm start
```

## API Endpoints

### Categories

- **Create Category**

- **POST /api/categories**

- Body: `multipart/form-data` with fields:

  - `name`: String (required)
  - `description`: String (required)
  - `taxApplicability`: Boolean (required)
  - `taxNumber`: Number (optional)
  - `taxType`: String (optional)
  - `image`: File (optional)

- **Get All Categories** : GET /api/categories

- **Get Category by Name** - GET /api/category/name/:catName

- **Get Category by ID** - GET /api/categories/:id

- **Update Category** - PUT /api/categories/:id

- Body: `multipart/form-data` with fields similar to Create Category

- **Delete Category** - DELETE /api/categories/:id

### Subcategories

- **Create Subcategory**

### Subcategories

- **Create Subcategory** - POST /api/subcategories

- Body: `multipart/form-data` with fields:

  - `name`: String (required)
  - `description`: String (required)
  - `taxApplicability`: Boolean (required)
  - `taxNumber`: Number (optional)
  - `taxType`: String (optional)
  - `image`: File (optional)
  - `category` : Id (required)

- **Get All Subcategories** - GET /api/subcategories

- **Get Subcategories by Category** - GET /api/subcategories/category/:id

- **Get Subcategory by Name** - GET /api/subcategories/:name

- **Get Subcategory by ID** - GET /api/subcategories/:id

- **Update Subcategory** - PUT /api/subcategories/:id
- Body: `multipart/form-data` with fields similar to Create Subcategory

- **Delete Subcategory** - DELETE /api/subcategories/:id

### Items

- **Create Item**

### Items

- **Create Item**

- Body: `multipart/form-data` with fields:

  - `name`: String (required)
  - `description`: String (required)
  - `taxApplicability`: Boolean (required)
  - `taxNumber`: Number (optional)
  - `baseAmount`: Number (required)
  - `discount`: Number (required)
  - `image`: File (optional)
  - `category` : Id (required)
  - `subCategory` : Id (required)

- **Get All Items** - GET /api/items

- **Get Items by Category** - GET /api/items/category/:id

- **Get Items by Subcategory** - /api/items/subcategory/:id

- **Get Item by ID** - GET /api/items/:id

- **Update Item** - PUT /api/items/:id
- Body: `multipart/form-data` with fields similar to Create Item

- **Delete Item** - DELETE /api/items/:id

- **Search Items** - GET /api/items/search?name=ItemName
