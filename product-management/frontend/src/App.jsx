import { useEffect, useState } from "react";

function App() {

    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [editId, setEditId] = useState(null);


    // Get products
    const getProducts = async () => {

        const response = await fetch(
            "http://localhost:3000/api/products"
        );

        const data = await response.json();

        setProducts(data);
    };


    // Run when page loads
    useEffect(() => {
        getProducts();
    }, []);


    // Add product
    const addProduct = async () => {

        if (!name || !price) {
            alert("Enter product name and price");
            return;
        }

        await fetch("http://localhost:3000/api/products", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                price: Number(price)
            })
        });

        setName("");
        setPrice("");

        getProducts();
    };


    // Delete product
    const deleteProduct = async (id) => {

        await fetch(
            `http://localhost:3000/api/products/${id}`,
            {
                method: "DELETE"
            }
        );

        getProducts();
    };
    const editProduct = (product) => {
    setEditId(product.id);
    setName(product.name);
    setPrice(product.price);
};  const updateProduct = async () => {

    await fetch(
        `http://localhost:3000/api/products/${editId}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                price: Number(price)
            })
        }
    );

    setEditId(null);
    setName("");
    setPrice("");

    getProducts();
};
    


    return (
        <div>

            <h1>Product Management</h1>

            <input
                type="text"
                placeholder="Product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            {editId === null ? (
    <button onClick={addProduct}>
        Add Product
    </button>
) : (
    <button onClick={updateProduct}>
        Update Product
    </button>
)}

            <h2>Products</h2>

            {products.map((product) => (
    <div key={product.id}>

        <span>
            {product.id}. {product.name} - ₹{product.price}
        </span>

        <button onClick={() => deleteProduct(product.id)}>
            Delete
        </button>

        <button onClick={() => editProduct(product)}>
            Edit
        </button>

    </div>
))}

        </div>
    );
}

export default App;