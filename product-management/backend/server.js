const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;
const filePath = "./data/products.json";


// Read products
function getProducts() {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
}


// Save products
function saveProducts(products) {
    fs.writeFileSync(
        filePath,
        JSON.stringify(products, null, 2)
    );
}


// GET all products
app.get("/api/products", (req, res) => {
    const products = getProducts();
    res.json(products);
});


// GET one product
app.get("/api/products/:id", (req, res) => {
    const products = getProducts();

    const id = Number(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
});


// POST - Add product
app.post("/api/products", (req, res) => {
    const products = getProducts();

    const newProduct = {
        id: products.length === 0
            ? 1
            : Math.max(...products.map(p => p.id)) + 1,
        name: req.body.name,
        price: req.body.price
    };

    products.push(newProduct);

    saveProducts(products);

    res.status(201).json(newProduct);
});


// DELETE product
app.delete("/api/products/:id", (req, res) => {
    let products = getProducts();

    const id = Number(req.params.id);

    const productExists = products.some(p => p.id === id);

    if (!productExists) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    products = products.filter(p => p.id !== id);

    saveProducts(products);

    res.json({
        message: "Product deleted"
    });
});



app.put("/api/products/:id", (req, res) => {

    const products = getProducts();

    const id = Number(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    product.name = req.body.name;
    product.price = req.body.price;

    saveProducts(products);

    res.json(product);
});
   app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});