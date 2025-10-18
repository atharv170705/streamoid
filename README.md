**Product Catalog Backend Service**
===================================

This project is a backend service designed for **Streamoid** to manage product catalogs efficiently. It provides a RESTful API that allows users to **upload CSV files**, **validate product data**, **store valid entries** in an SQLite database, and **search or retrieve** products with ease.

**Features**
-------------
*   **CSV Upload:** Upload a product catalog in CSV format.
    
*   **Data Validation:** Each row is validated for:
    
    *   Required fields: sku, name, brand, mrp, price.
        
    *   Business rules: price <= mrp, quantity >= 0.
        
*   **Database Storage:** Valid products are stored in SQLite. Existing products (by SKU) are automatically updated.
    
*   **List API:** Retrieve all stored products with pagination support.
    
*   **Search API:** Filter products by brand, color, and price range (minPrice, maxPrice).
    

**Tech Stack**
--------------

*   **Node.js**
    
*   **Express.js**
    
*   **SQLite**
    
*   **ES Modules**
    
*   [multer](https://www.npmjs.com/package/multer) – for file uploads
    
*   [csv-parser](https://www.npmjs.com/package/csv-parser) – for CSV streaming
    
*   [sqlite](https://www.npmjs.com/package/sqlite) and [sqlite3](https://www.npmjs.com/package/sqlite3) – for database handling
    

How to Test the APIs in Postman
-------------------------------

### 1\. Test **GET /products** (The List API)

This is the easiest one.

1.  Open a new tab in **Postman**.
    
2.  Make sure the method (the dropdown next to the URL) is set to **GET**.
    
3.  In the URL bar, type: [http://localhost:8000/products](http://localhost:3000/products) 
    
4.  Click **Send**.
    
5.  You will see the JSON response in the bottom panel.
    
**Sample Response:**
```JSON

[
    {
        "id": 1,
        "sku": "TSHIRT-RED-001",
        "name": "Classic Cotton T-Shirt",
        "brand": "StreamThreads",
        "color": "Red",
        "size": "M",
        "mrp": 799,
        "price": 499,
        "quantity": 20
    },
    {
        "id": 2,
        "sku": "TSHIRT-BLK-002",
        "name": "Classic Cotton T-Shirt",
        "brand": "StreamThreads",
        "color": "Black",
        "size": "L",
        "mrp": 799,
        "price": 549,
        "quantity": 12
    }
    // ... other products
]
```  

### **2\. GET /products/search** – Filter products

1.  Open a new tab in Postman.
    
2.  Set method to **GET**.
    
3.  URL: http://localhost:8000/products/search?brand=BloomWear&maxPrice=2500
    
4.  Click **Params** and add filters
    
5.  Click **Send**.
    

**Sample Response:**
```JSON
[
    {
        "id": 6,
        "sku": "DRESS-PNK-S",
        "name": "Floral Summer Dress",
        "brand": "BloomWear",
        "color": "Pink",
        "size": "S",
        "mrp": 2499,
        "price": 2199,
        "quantity": 10
    },
    {
        "id": 7,
        "sku": "DRESS-YLW-M",
        "name": "Floral Summer Dress",
        "brand": "BloomWear",
        "color": "Yellow",
        "size": "M",
        "mrp": 2499,
        "price": 1999,
        "quantity": 7
    }
]

```

### **3\. POST /upload** – Upload CSV file

1.  Open a new tab.
    
2.  Set method to **POST**.
    
3.  URL: http://localhost:8000/upload
    
4.  Go to **Body → form-data**.
    
5.  Add key **file**, change type to **File**, and select your CSV file.
    
6.  Click **Send**.
    

**Sample Response:**

```JSON
{
    "stored": 33,
    "failed": []
}

````

**Conclusion**
--------------

This project demonstrates a clean, modular Node.js backend for product catalog management.You can extend it with features like authentication, analytics, or frontend dashboards.
