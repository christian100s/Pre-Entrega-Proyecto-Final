import { Router } from "express";
import ProductManager from '../ProductManager.js';

const productManager = new ProductManager();

const router = Router();

router.get('/', async (req, res) => {
  const { limit } = req.query;
  const products = JSON.parse(await productManager.getProducts());
    if (limit) {
    const limitedProducts = products.slice(0, parseInt(limit));
    return res.status(200).json(limitedProducts);
  } else {
    return res.status(200).json(products);
  }
})

router.get('/:pid', async (req, res) => {
  const { pid } = req.params;
  const product = await productManager.getProductById(parseInt(pid));
  if (product) {
    return res.json(product);
  } else {
    return res.status(404).json({ error: 'Product not found' });
  }
});

router.post('/', async (req, res) => {
await productManager.addProduct(req.body)
res.status(201).json(req.body)
})

router.put('/:pid', async (req, res) => {
const { pid } = req.params;
await productManager.updateProduct(pid,req.body)
res.status(200).json(req.body)
})

router.delete('/:pid', async (req, res) => {
const { pid } = req.params;
await productManager.deleteProduct(pid)
res.status(200).json({ message: 'Product deleted' })
});


export default router;