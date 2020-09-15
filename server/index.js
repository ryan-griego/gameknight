require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const viewAllProducts = `
   SELECT "productId", "name", "price", "image", "shortDescription"
     from "products"
  `;
  db.query(viewAllProducts)
    .then(result => res.json(result.rows))
    .catch(err => next(err));

});

app.get('/api/products/:productId', (req, res, next) => {
  const viewSingleProduct = `
   SELECT *
     from "products"
     where "productId" = $1
  `;
  const productId = parseInt(req.params.productId);
  const params = [productId];
  db.query(viewSingleProduct, params)
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json({
          error: `productId: ${productId} cannot be located.`
        });
      } else {
        res.json(result.rows[0]);
      }
    })
    .catch(err => next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404))
    );
});

// Add an initial GET endpoint for /api/cart

app.get('/api/cart', (req, res, next) => {
  const viewAllCarts = `
    SELECT *
      from "carts"
  `;
  db.query(viewAllCarts)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});





// Add a POST endpoint for /api/cart

app.post('/api/grades', function (req, res) {


})

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
