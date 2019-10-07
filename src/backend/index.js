const express = require ('express');
const app = express ();
const cors = require ('cors');

// Routers
const router = express.Router ();
const mealsRouter = require ('./api/meals.js');
const reservationsRouter = require ('./api/reservations.js');
const reviewsRouter = require ('./api/reviews.js');
const imagesRouter = require ('./api/images.js');
const reservationsLeftRouter = require('./api/reservationsLeft.js');

//Port
const port = process.env.PORT || 5000;

// Serve the built client html
const path = require ('path');
const buildPath = path.join (__dirname, '../../dist');
const buildPathAssets = path.join (__dirname, '../../assets');
app.use (express.static (buildPath));
app.use ('/assets', express.static (buildPathAssets));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use (express.urlencoded ({extended: true}));
// Parse JSON bodies (as sent by API clients)
app.use (express.json ());

// Cors handler
app.use (cors ());

router.use ('/meals', mealsRouter);
router.use ('/reservations', reservationsRouter);
router.use ('/reviews', reviewsRouter);
router.use ('/images', imagesRouter);
router.use ('/reservations-left', reservationsLeftRouter);

app.use ('/api', router);

// Ensures that the client router works on reload aswell.
// Sends all requests back to index.html where the routing lib takes over
app.get ('/*', function (req, res) {
  res.sendFile (path.join (__dirname, './../../dist/index.html'), function (
    err
  ) {
    if (err) {
      res.status (500).send (err);
    }
  });
});

app.listen (port, () => console.log (`Server listening on port ${port}!`));
