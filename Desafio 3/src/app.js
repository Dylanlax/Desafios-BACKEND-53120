import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
const productManager = new ProductManager();

app.get('/products', async (req, res) => {
    try {
        let limit = req.query.limit; 
        await productManager.loadProducts(); 
        let products = productManager.getAllProducts(limit);

        res.json(products);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.get('/products/:pid', async (req, res) => {
    let productId = parseInt(req.params.pid);
    try {
        await productManager.loadProducts(); 
        const product = productManager.getProductById(productId);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener producto por id:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});