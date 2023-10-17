import { Router } from "express";


import CartManager from '../CartsManager.js';
const cartManager= new CartManager();

const router = Router();

router.get('/', async (req, res) => {
  const carts = JSON.parse(await cartManager.getCarts());
  return res.status(200).json(carts);
}) 
// Ruta raíz POST / para crear un nuevo carrito
router.post('/', async (req, res) => {
  await cartManager.addCart(req.body)
  res.status(201).json(req.body); //
});

router.get('/:cid', async (req, res) => {
  const carts = JSON.parse(await cartManager.getCarts());
  const cart = carts.find(cart => cart.id === req.params.cid)
  return cart? res.status(200).json(cart): res.status(404).json({ error: 'Cart not found' });
});

router.post('/:cid/product/:pid', async (req, res) => {
  const carts = JSON.parse(await cartManager.getCarts());
  const cart = carts.find(cart => cart.id === req.params.cid)
  if (!cart) {
    res.status(404).json({ message: 'cart no found' }); 
  } else {
    const productId = req.params.pid;
    const product = { id: productId, quantity: 1 }; 
    const existingProduct = cart.products.find(p => p.id === productId); 
    if (existingProduct) {
      existingProduct.quantity++; // producto existe, aumentar
    } else {
      cart.products.push(product); //producto no existe, agregarlo al carrito
    }
    res.json(cart.products); // Devolver los productos
    await cartManager.updateCart(req.params.cid, cart);
  }
});


export default router;