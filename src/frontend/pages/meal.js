function renderHtmlMeals(req, router) {
  document.body.innerHTML = `
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
    <section id="meals-display">
      <div id="meals-display-bg" class="bg-beige text-center position-relative mb-3">
        <h1 class="to-the-center" >Find your next meal</h1>  
      </div>
      <ul id="meals-display-ul" class="list-unstyled container"></ul>

    </section>
    `
}

renderHtmlMeals();

function renderMeals () {
  fetch('http://localhost:3000/api/meals/')
  .then(resp => resp.json())
  .then(meals => {
    const mealsUL = document.querySelector('#meals-display-ul');
    meals.forEach((meal) => {
      const mealsLi = document.createElement('li');
      mealsLi.classList.add("row");
      mealsLi.classList.add("py-2");
      mealsLi.innerHTML = `<div class="col">
                              <h2>${meal.title}</h2>
                              <p>${meal.description}</p>
                              <p>Price: ${meal.price} /person</p>
                              <p>When: ${meal.when}</p>
                              <p>Location: ${meal.location}</p>
                              <p>Stars: ${meal.star}</p> 
                              
                            </div>
                            <div class="col position-relative">
                              <div class="to-the-center">
                                <img src="" alt="meal-img" class="">
                                <a href="http://localhost:3000/revies/${meal.id}" class=" btn btn-warning my-2 w-75">Reviews</a>
                                <a href="#" class=" btn btn-success my-2 w-75">Book meal</a>
                                
                              </div>
                            </div>  
                            <div id="reviews">
                              <p>
                            </div> 
                            <hr id="line-between-meals">                
      `
      mealsUL.appendChild(mealsLi);
    })
  });
}

renderMeals();


export default renderHtmlMeals;
