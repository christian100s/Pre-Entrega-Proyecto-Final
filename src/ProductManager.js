import { promises as fs } from 'fs';
import { uuid } from 'uuidv4';

export default class ProductManager {
  constructor() {
    this.path = "./src/products.json" //ruta de mi archivo
  }

  async getProducts() {
      try {
        let archivo = await fs.readFile(this.path,"utf-8");
        return archivo
      } catch (error) {
        console.error('Error', error.message)
      }
    }

    async addProduct(addProduct) {
      if (!addProduct) {
          console.log("Error, data required")
      } else {
        let archivo = await fs.readFile(this.path,"utf-8")
        let products = JSON.parse(archivo)
      let product = products.find(prod => prod.code === addProduct.code) //verifica si el codigo esta en la db
      if (product) {
          return console.log("invalid code, existing")
      } else {
          addProduct.id= uuid()
          products.push(addProduct)
          await fs.writeFile(this.path, JSON.stringify(products, null, 2), "utf-8")
          console.log("Product add")
      }
      }
  }
    async getProductById(id) {
      if (id) { 
      let archivo = await fs.readFile(this.path,"utf-8")
      let products = JSON.parse(archivo)
      let product = products.find(prod => prod.id === id)
      return product ? product : ""
      } else {
        console.log("Error, required ID")
      }
    }

    async deleteProduct(id) {
      if (id) {
      let archivo = await fs.readFile(this.path,"utf-8")
      let products = JSON.parse(archivo)
      const index = products.findIndex((product) => product.id === id);
      if (index !== -1) {
        products.splice(index, 1);
        await fs.writeFile(
          this.path,
          JSON.stringify(products, null, 2),
          "utf-8"
        );
        console.log("Product deleted by ID:",id)
      } else {
        console.log("invalid or no found ID:",id)
      }
    } else {
      console.log("Error, required ID")
    }
    }

    async updateProduct(id, updates) {
      if (!id || !updates){
        console.log("Error, data required")
      } else {
      let archivo = await fs.readFile(this.path,"utf-8")
      let products = JSON.parse(archivo)
      let product = products.find(prod => prod.id === id)
      if (product) {
        let productsUpdated = products.map((ele)=>{
          if(ele.id==id) {
            updates.id=id
            return updates
          } else {
            return ele
          }
        })
        await fs.writeFile(this.path, JSON.stringify(productsUpdated, null, 2), "utf-8")
    } else {
        console.log("ID no found:",id)
    }
    }
  }
}