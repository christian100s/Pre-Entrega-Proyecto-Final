import {Server} from 'socket.io'
import ProductManager from './ProductManager.js';


let io

const productManager = new ProductManager();
const products = JSON.parse(await productManager.getProducts())

export const init = (httpServer) => {
    io = new Server(httpServer)
    io.on('connection',(socketClient) => {
        console.log('Cliente conectado',socketClient.id)
        socketClient.emit('products',products) // envia productos
    })
}

export const emitFromApi = (event, data) => io.emit(event, data);