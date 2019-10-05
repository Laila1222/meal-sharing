function renderMealsHtml () {
  document.body.innerHTML = `
    <header class="container"> 
        <nav class="navbar navbar-light navbar-expand-sm d-flex justify-content-between">
        <a class="d-block text-muted" href="https://hyf-mealsharing.herokuapp.com">MealShare <img src="../assets/logo.png" alt="logo" id="logo"</a>
            
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
            
          <div class="collapse navbar-collapse ml-sm-auto" id="navbarSupportedContent">
              <ul class="navbar-nav ml-auto">
                  <li class="nav-item "><a class="nav-link" href="http://localhost:3000/meals">Find a meal</a></li>
                  <li class="nav-item "><a class="nav-link" href="http://localhost:3000/add-meal">Become a host</a></li>
              </ul>
          </div>
        </nav>
    </header>

    <div id="meals-display-bg" class="bg-beige text-center position-relative mb-3">
      <h1 class="to-the-center text-white" id="find-next-meal">Find your next meal</h1>  
    </div> 

    <section id="search" class="position-relative pd-4">
      <div class="container py-4 ">
        <h3 class="text-center pb-3">Search for a meal</h3>
        <form class="w-auto row  justify-content-center">
          
          <div class="form-group col-auto ">
            <label for="title">Name of food</label>
            <input type="text" id="title">
          </div>
          <div class="form-group col-auto ">
            <label for="created-after">Meal created after</label>
            <input type="date" id="created-after">
          </div>
        
          <div class="form-group col-auto ">
            <label for="max-price">Maximum price</label>
            <input type="range" name="max-price" min="0" max="5" id="max-price" >
          </div>
          <div class="form-group col-auto">
            <label for="limit">Limit number of matches</label>
            <select name="limit" id="limit" >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
          </div>
          
          <div class="form-group col-auto">
          <a id="search-btn" type="button" class="btn btn-success">Search</a>
          </div>
        </form>
    </div>
    </section>
    <section class="bg-beige">

      <div id="display-meals" class="container">
        <ul id="meals-display-ul" class="row list-unstyled py-5">
        </ul>
      </div>

    </section>
    <div id="image-here"></div>
    `;
}



function renderMeals (url) {
  fetch (url).then (resp => resp.json ()).then (meals => {
    const mealsUL = document.querySelector ('#meals-display-ul');
    meals.forEach (meal => {
      const mealsLi = document.createElement ('li');
      mealsLi.classList.add ('col-md-4');
      // mealsLi.classList.add("set-max-width");
      mealsLi.classList.add ('py-2');
      mealsLi.innerHTML = ` <div class="card">
                                <img class="card-img-top d-block" src="${meal.img}" alt="meal-image">
                                <div class="card-body">
                                  <h2 class="h5 card-title">${meal.title}</h2>
                                  <p class="card-text">${meal.description}</p>
                                  <p class="card-text">Price: ${meal.price} per person</p>
                                  <p class="card-text">When: ${meal.when}</p>
                                  <p class="card-text">Location: ${meal.location}</p>
                                  <a href="https://hyf-mealsharing.herokuapp.com/reviews/${meal.id}" class="btn btn-warning my-2 w-75">Read more</a>
                                </div>
                              </div>
                            `;
      mealsUL.appendChild (mealsLi);
    });
  });
}

function renderFiltered () {
  const title = document.querySelector ('#title').value;
  const maxPrice = document.querySelector ('#max-price').value;
  const createdAfter = document.querySelector ('#created-after');
  const limit = document.querySelector ('#limit');

  const url = `https://hyf-mealsharing.herokuapp.com/api/meals?title=${title}&maxPrice=${maxPrice}&createdAfter=${createdAfter}&limit=${limit}`;
  console.log (url);
  renderMeals (url);
}
renderMealsHtml();
renderMeals ('https://hyf-mealsharing.herokuapp.com/api/meals');


const filterBtn = document.querySelector('#search-btn');
filterBtn.addEventListener('click', () => {
    console.log('hello');
});





export default renderMealsHtml;
