const htmlElements = `
<header class="container"> 
    
  <nav class="navbar navbar-light navbar-expand-sm d-flex justify-content-between">
      <a class="d-block text-muted" href="/home">MealShare <img src="../assets/logo.png" alt="logo" id="logo"</a>
      
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse ml-sm-auto" id="navbarSupportedContent"> 
        <ul class="navbar-nav ml-auto">
          <li class="nav-item "><a class="nav-link" href="/meals">Find a meal</a></li>
          <li class="nav-item"><a class="nav-link" href="/add-meal">Become a host</a></li>
        </ul>
      </div>
  </nav>
</header>

<div id="welcome-text" class="text-center">
  <div class="to-the-center">    
    <h1 class="text-white">Find new friends and fabulous meals</h1>
    <h2 class="h3 pb-3 text-white">Discover home cooking</h2>
    <a class="btn btn-success" href="/meals">Find meals</a>
  </div>
</div>
   
<section id="featured-meals">
  <div class="container text-center pb-5">
    <h2 class="py-5">Featured meals</h2>
    <ul id="featured-meals-ul" class="row list-unstyled"></ul>
  </div>
</section>

<section id="stories" class="bg-beige">
  <div class="container text-center pb-5">
    <h2 class="py-5">Stories</h2>
    <ul id="featured-stories-ul" class="d-flex align-content-center flex-wrap justify-content-around list-unstyled "></ul>
  </div>
  
</section>
<div id="hungry" class="position-relative">
  <div id="hungry-cover" class="text-center to-the-center text-white">
    <h2 class="pb-3">Hungry?</h2>
    <a class="btn btn-success mx-3" href=/meals">Find a meal</a>
    <a class="btn btn-success mx-3" href="">Create a meal</a>
  </div>
</div>`;

// Render meals from API
function renderMeals () {
  fetch ('/api/meals').then (resp => resp.json ()).then (meal => {
    const featuredMealUl = document.querySelector ('#featured-meals-ul');
    const mealsArray = meal;
    const displayMeals = [];

    // Create an array with these 3 food and render them in featured meals
    mealsArray.filter (meal => {
      if (
        meal.title === 'Pizza' ||
        meal.title === 'Penne' ||
        meal.title === 'Pasta'
      ) {
        displayMeals.push (meal);
      }
    });
    displayMeals.forEach (meal => {
      const featuredLi = document.createElement ('li');
      featuredLi.classList.add ('px-2');
      featuredLi.classList.add ('col-md-4');
      featuredLi.innerHTML = `<div class="card my-3 mx-2 shadow p-3 mb-5 bg-white rounded h-100">
                                
                                <img id="meal-card-img" class="card-img-top d-block" src="${meal.img}" alt="meal-img">
                                
                                <div class="card-body ">
                                  <h3 class="h4 card-title">${meal.title}</h3>
                                  <p class="card-text">Location: ${meal.location}</p>
                                  <p class="card-text">Date: ${meal.when}</p>
                                  <p class="card-text">Price: ${meal.price}</p>
                                  <a href="/reviews/${meal.id}" class="btn btn-success">Book meal</a>
                                </div>
                              </div>`;
      featuredMealUl.appendChild (featuredLi);
    });
  });
}

// Render reviews from API
function renderReviews () {
  fetch ('/api/reviews/').then (resp => resp.json ()).then (review => {
    const featuredStoryUl = document.querySelector ('#featured-stories-ul');
    review.length = 3;
    review.forEach (review => {
      const featuredLi = document.createElement ('li');
      featuredLi.classList.add ('px-2');
      featuredLi.innerHTML = `<div>
                                  <a href="/reviews/${review.meal_id}" >
                                  <h4 class="text-dark">${review.title}</h4>
                                  <h5 class="text-dark">${review.description}</h5>
                                  <p class="text-dark">Stars:  ${review.stars}</p>
                                  </a>
                                </div>`;
      featuredStoryUl.appendChild (featuredLi);
    });
  });
}

function homeRouter (req, router) {
  document.body.innerHTML = htmlElements;
  renderMeals ();
  renderReviews ();
}

export default homeRouter;
