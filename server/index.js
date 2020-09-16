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
    .catch(err => next(err));
});

// Add an initial GET endpoint for /api/cart

app.get('/api/cart', (req, res, next) => {

  db.query()
    .then(result => res.json([]))
    .catch(err => next(err));
});

// END GET

app.post('/api/cart/', (req, res, next) => {
  const { productId } = req.body;

  if (parseInt(productId) < 0) {
    return next(new ClientError(`${productId} is not a valid Product ID`, 400));
  }

  const checkPrice = `
  SELECT "price"
  FROM "products"
  WHERE "productId" = $1
`;

  const value = [productId];

  db.query(checkPrice, value)
    .then(result => {

      if (!result.rows[0]) {
        throw new ClientError(`productId ${productId} does not exist`, 400);
      } else if ('cartId' in req.session) {
        return {
          price: result.rows[0].price,
          cartId: req.session.cartId
        };
      }
      const addCartId = `
          INSERT INTO "carts" ("cartId", "createdAt")
          VALUES (default, default)
          RETURNING "cartId"
        `;
      return db.query(addCartId).then(cartId => ({
        price: result.rows[0].price,
        cartId: cartId.rows[0].cartId
      }));
    })
    .then(data => {
      req.session.cartId = data.cartId;
      const price = data.price;
      const addItemToCart = `
        INSERT INTO "cartItems" ("cartId", "productId", "price")
        VALUES ($1, $2, $3)
        RETURNING "cartItemId"
      `;
      const values = [data.cartId, productId, price];
      return db.query(addItemToCart, values).then(cartItemId => ({
        cartItemId: cartItemId.rows[0]
      }));
    })
    .then(cartItemId => {
      const selectAllCartItems = `
      SELECT "c"."cartItemId",
        "c"."price",
        "p"."productId",
        "p"."image",
        "p"."name",
        "p"."shortDescription"
      FROM "cartItems" as "c"
      JOIN "products" as "p" using ("productId")
      WHERE "c"."cartItemId" = $1
      `;
      const value = [cartItemId.cartItemId];
      return db.query(selectAllCartItems, value)
        .then(data => {
          res.status(201).json(data.rows);
        });
    })
    .catch(err => next(err));
});

// end POST

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
