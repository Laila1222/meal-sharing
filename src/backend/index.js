
const express = require('express');
const app = express();
const request = require('request');
const port = process.env.PORT || 5000;
const path = require('path'); 
const apiServerHost = 'https://hyf-mealsharing.herokuapp.com/'
// Serve the built client html
const buildPath = path.join(__dirname, "../../dist");
const buildPathAssets = path.join(__dirname, "../../assets");


// Routers
const router = express.Router();
const mealsRouter = require('./api/meals.js');
const reservationsRouter = require('./api/reservations.js');
const reviewsRouter = require('./api/reviews.js');
const imagesRouter = require('./api/images.js');

// Proxy
// app.use('/', (req, res) => {
//   const url = apiServerHost + req.url;
//   req.pipe(request(url)).pipe(res);
// });


app.use(express.static(buildPath)); 

app.use('/assets', express.static(buildPathAssets));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());



// If path= meals, use mealsRouter
router.use('/meals', mealsRouter);
router.use('/reservations', reservationsRouter);
router.use('/reviews', reviewsRouter);
router.use('/images', imagesRouter);

// path 'api' uses express router
app.use('/api', router);

// For week4 no need to look into this!
// Ensures that the client router works on reload aswell.
// Sends all requests back to index.html where the routing lib takes over
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "./../../dist/index.html"), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
}); 

app.listen(port, () => console.log(`Server listening on port ${port}!`));
