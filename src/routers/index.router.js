import { Router } from 'express';
import productRouter from './products.js'
import cartRouter from './carts.js'
import ProductManager from '../ProductManager.js';
import { emitFromApi } from '../socket.js'

const router = Router();
const productManager = new ProductManager();
const products = JSON.parse(await productManager.getProducts())

router.get('/', async (req, res) => {
  res.render('index', {products}); //nombre de la plantilla handlebars
});

router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');
});

router.post('/realtimeproducts', async (req, res) => {
  
  await productManager.addProduct(req.body)
  products = JSON.parse(await productManager.getProducts())
  emitFromApi('New-Product-from-api', req.body);
  res.status(200).json(req.body);
});

router.use('/api/products', productRouter)
router.use('/api/carts', cartRouter)

export default router;