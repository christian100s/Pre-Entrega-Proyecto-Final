import { promises as fs } from 'fs';
import { uuid } from 'uuidv4';

export default class CartManager {
  constructor() {
    this.path = "./src/carts.json" //ruta de mi archivo
  }

  async getCarts() {
      try {
        let archivo = await fs.readFile(this.path,"utf-8");
        return archivo
      } catch (error) {
        console.error('Error', error.message)
      }
    }


  async addCart(cart) {
    if (!cart) {
        console.log("Error, data required")
    } else {
      let archivo = await fs.readFile(this.path,"utf-8")
      let carts = JSON.parse(archivo)
      cart.id= uuid()
      carts.push(cart)
      await fs.writeFile(this.path, JSON.stringify(carts, null, 2), "utf-8")
      console.log("Cart add")
    }
  }

  async updateCart(id, cart) {
    let archivo = await fs.readFile(this.path,"utf-8")
      let carts = JSON.parse(archivo)
      let cartFound = carts.find(cart => cart.id === id)
      if (cartFound) {
        let cartsUpdated = carts.map((ele)=>{
          if(ele.id===id) {
            cart.id=id
            return cart
          } else {
            return ele
          }
        })
        await fs.writeFile(this.path, JSON.stringify(cartsUpdated, null, 2), "utf-8")
        } 
  }

}