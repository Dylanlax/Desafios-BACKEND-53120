// HECHO POR DYLAN LAX
class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    addProduct(code, description, title, thumbnail, price, stock){

        const existingProduct = this.products.find(product => product.code === code);
        if(existingProduct) {
            console.log("Ya existe un producto con este mismo codigo");
            return;
        }


        const newProduct = {
            id: this.nextId,
            code: code,
            title: title,
            description: description,
            thumbnail: thumbnail,
            price: price,
            stock: stock
        };

        this.products.push(newProduct);
        this.nextId++;

        

        
    }

    //updatear la info de un producto
    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            console.log("Error: Producto no encontrado.");
            return;
        }

const updatedProduct = { ...this.products[productIndex], ...updatedFields };
this.products[productIndex] = updatedProduct;
}

// eliminar producto
deleteProduct(id) {
    const indexToDelete = this.products.findIndex(p => p.id === id);
    if (indexToDelete === -1) {
        console.log("Error: El producto que se intento eliminar no fue encontrado.");
        return;
    }

    
    this.products.splice(indexToDelete, 1);
}

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product){
            return product;
        } else {
            console.log("Error: producto no encontrado!");
        }
    }
    
}

const manager = new ProductManager();

manager.addProduct("COD1", "Producto 1", "Ensalada", "../img/ensalada.jpg", 2000, 2)
manager.addProduct("COD2", "Producto 2", "Papasfritas", "../img/papasfritas.jpg", 500, 7)
manager.addProduct("COD3", "Producto 3", "Hamburguesa", "../img/Hamburguesa.jpg", 6000, 5)
manager.addProduct("COD1", "Producto 4", "Frutas", "../img/frutas.jpg", 1000, 4)


const allProducts = manager.getProducts();
console.log(allProducts)

console.log(manager.getProductById(1));
console.log(manager.getProductById(77));

manager.updateProduct(2, { price: 1899, stock: 777 });

console.log(manager.getProducts());

manager.deleteProduct(3);

console.log(manager.getProducts());