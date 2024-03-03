// HECHO POR DYLAN LAX
const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch (err) {
            console.error('Error al cargar productos:', err);
            this.products = [];
        }
    }

    saveProducts() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
        } catch (err) {
            console.error('Error guardando productos:', err);
        }
    }

    addProduct(newProduct) {
        newProduct.id = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    updateProduct(id, updatedFields) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedFields };
            this.saveProducts();
            return this.products[index];
        }
        return null;
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
            return true;
        }
        return false;
    }
}


const manager = new ProductManager('products.json');

// AGREGAR PRODUCTO
manager.addProduct({
    title: 'Producto 1',
    description: 'Hamburrguesa',
    price: 1000,
    thumbnail: 'img/imagen1.jpg',
    code: 'PROD001',
    stock: 20
});

manager.addProduct({
    title: 'Producto 2',
    description: 'Papafritas',
    price: 777,
    thumbnail: 'img/imagen2.jpg',
    code: 'PROD002',
    stock: 77
});

manager.addProduct({
    title: 'Producto 3',
    description: 'Helado',
    price: 500,
    thumbnail: 'img/imagen3.jpg',
    code: 'PROD003',
    stock: 30
});



// CONSULTRAR PRODUCTO POR ID
console.log(manager.getProductById(1));

// MODIFICAR PRODUCTO
manager.updateProduct(1, { price: 300 });

// CONSULTAR PRODUCTOS
console.log(manager.getProducts());
// ELIMINAR PRODUCTO
manager.deleteProduct(1);