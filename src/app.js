import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';

import indexRouter from './routers/index.router.js';
import { __dirname } from './utils.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

//handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

//indexRouter
app.use('/', indexRouter);


app.use((error, req, res, next) => {
  const message = `Error: ${error.message}`;
  console.log(message);
  res.status(500).json({ status: 'error', message });
});

export default app;
