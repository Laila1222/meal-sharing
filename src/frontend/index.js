import "./index.css";
// import "bootstrap";

import SPARouter from "@kodnificent/sparouter";

import mealRouter from "./pages/meal";
import homeRouter from "./pages/home";
import reviewRouter from "./pages/reviewsAndBook";
import reservationRouter from "./pages/createMeal";

const options = {
  historyMode: true // set this to true if you use the HTML5 history mode API
};
const router = new SPARouter(options);

router.get("/", homeRouter);
router.get("/meals", mealRouter);
router.get("/reviews/{id}", reviewRouter);
router.get("/create-meal", reservationRouter);

router.init();
