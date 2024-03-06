// HECHO POR DYLAN LAX
import * as fs from 'fs';



export default class ProductManager {
    constructor() {
        this.path = 'products.json';
        this.loadProducts();
    }

    async loadProducts() {
        try {
            const data = await fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch (err) {
            console.error('Error al cargar productos:', err);
            this.products = [];
        }
    }

    async saveProducts() {
        try {
            await fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
        } catch (err) {
            console.error('Error guardando productos:', err);
        }
    }


    getAllProducts(limit) {
        let products = this.products;
        if (limit) {
            products = products.slice(0, limit);
        }
        return products;
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

}