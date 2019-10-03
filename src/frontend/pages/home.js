function homeRouter(req, router) {
  document.body.innerHTML = `
  <div id="welcome-background" class="bg-beige">  
    <header class="container"> 
         
        <nav class="navbar navbar-light navbar-expand-sm d-flex justify-content-between">
            <a class="navbar-brand d-block" href="http://localhost:3000/meals">Logo</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse ml-sm-auto" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item "><a class="nav-link" href="">Find a meal</a></li>
                    <li class="nav-item "><a class="nav-link" href="">Become a host</a></li>
                </ul>
            </div>
        </nav>

     
    </header>
    <div id="welcome-text" class="text-center">
      <div class="to-the-center">    
        <h1>Find new friends and fabulous meals</h1>
        <h2 class="h3 pb-3">Discover home cooking</h2>
        <a class="btn btn-success" href="http://localhost:3000/meals">Find meals</a>
      </div>
    </div>
     
  </div>
    
  <section id="featured-meals">
    <div class="container text-center pb-5">
      <h2 class="py-5">Featured meals</h2>
      <ul id="featured-meals-ul" class="d-flex align-content-center flex-wrap justify-content-around list-unstyled "></ul>
    </div>
  </section>
  
  <section id="stories" class="bg-beige">
    <div class="container text-center pb-5">
      <h2 class="py-5">Stories</h2>
      <ul id="featured-stories-ul" class="d-flex align-content-center flex-wrap justify-content-around list-unstyled "></ul>
    </div>
    
  </section>
  <section id="hungry">
    <div id="hungry-cover" class="text-center">
      <h2 class="pb-3">Hungry?</h2>
      <a class="btn btn-success mx-3" href="http://localhost:3000/meals">Find a meal</a>
      <a class="btn btn-success mx-3" >Create a meal</a>
    </div>
  </section>
          `
}

homeRouter();

function renderMeals () {
  fetch('http://localhost:3000/api/meals/')
  .then(resp => resp.json())
  .then(meal => {
    const featuredMealUl = document.querySelector('#featured-meals-ul');
    const mealsArray = meal;
    const displayMeals = [];
    mealsArray.filter(meal => {
      if (meal.title === 'Pizza' || meal.title === 'Penne' || meal.title === 'Pasta') {
        displayMeals.push(meal);
      }
    });
    displayMeals.forEach((meal) => {
      const featuredLi = document.createElement('li');
      featuredLi.classList.add("px-2");
      featuredLi.innerHTML = `<strong>${meal.title}</strong><br>Where: ${meal.location}<br>When:  ${meal.when}`;
      featuredMealUl.appendChild(featuredLi);
    });
  });
}

function renderReviews () {
  fetch('http://localhost:3000/api/reviews/')
  .then(resp => resp.json())
  .then(review => {
    const featuredStoryUl = document.querySelector('#featured-stories-ul');
    review.length = 3;
    review.forEach((review) => {
      const featuredLi = document.createElement('li');
      featuredLi.classList.add("px-2");
      featuredLi.innerHTML = `<strong>${review.title}</strong><br>${review.description}<br>Stars:  ${review.stars}`;
      featuredStoryUl.appendChild(featuredLi);
    })
  })
}

renderMeals();
renderReviews();

export default homeRouter;
