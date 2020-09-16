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
  // const viewAllCarts = `
  //   SELECT *
  //     from "carts"
  // `;
  db.query()
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});


// END GET



// Add a POST endpoint for /api/cart

app.post('/api/cart/', function (req, res) => {
  const checkPrice = `
    SELECT "price"
    from "cartItems"
    where "productId" = $1
    returning *;
  `;
  console.log("Log the req.body", req.body);
  const { productId } = req.body;
  if(parseInt(productId, 10) < 0) {
    return res.status(400).json({
      error: 'ProductId must be a positive integer.'
    });
  }

  const values = [price, productId];
db.query(checkPrice, values)
    .then(result => {
        const addNewCart = `
          INSERT INTO "carts" ("cartId", "createdAt")
          VALUES (default, default)
          returning "cartId"
        `;
        const product = result.rows[0];
        if (!product) {
          throw new ClientError(`cannot ${req.method} ${req.originalUrl} - There are no rows in the query result`, 400)
        }
        return addNewCart;
        // res.status(201).send(grade);
    })
    .then(result => {
      const product = result.rows[0];
      res.status(201).send(grade);
    })
    .then(result => {
      const product = result.rows[0];
      res.status(201).send(grade);
    })
      .catch(err => {
        console.error(err);
        res.status(500).json({
          error: 'An unexpected error occured.'
        });
      });
  });


// const postProduct = `
//     insert into "cartItems" ("price","productId")
//     values ($1, $2)
//     where "productId" = $1
//     returning *;
//   `;



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
