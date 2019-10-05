

function renderHtml () {
    document.body.innerHTML =`
    
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
       
       
        <div id="reviews-display-bg" class="bg-beige text-center position-relative mb-4">
            <h1 class="to-the-center" >Reviews</h1>  
        </div>
        

        <main class="row py-4">
            <div class="col-sm">
                <div id="meal-desc">
                    <img src="" alt="meal-photo">
                </div>
                <div id="list-reviews">
                    <ul id="reviews-display-ul" class="list-unstyled container"></ul>
                </div>
            </div>  
            <div class="card col-sm ">
                <div class="card-body" id="booking-card">
                    <form action="#" method="POST">
                        <div class="form-group">
                            <h2 class="h4" id="price"></h2>
                            <hr>
                            <label for="date">Date</label>
                            <input type="date" id="date" name="created_date" class="form-control" aria-describedby="date">
                        </div>
                        <div class="form-group">
                            <label for="selected-meal">Meal ID</label>
                            <select name="meal_id" id="selected-meal" class="form-control">
                                <option id="meal-id-in-option" value="meal_id"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="number-of-guests">Guests</label>
                            <select name="number_of_guests" id="number-of-guests class="form-control"">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="message">Your personal message</label>
                            <textarea name="message" id="message" cols="30" rows="10" placeholder="Write your message here" class="form-control"></textarea>
                        </div>
                        <a id="submit-btn" type="button" class="btn btn-success">Book meal</a>
                    
                    </form>
                </div>
            </div>
        </main>
        `;
}


renderHtml();

function renderIdMeal(req, router) {    
    const id = req.param.id;
    const mealSection = document.querySelector('#meal-desc');
    const reviewsUl = document.querySelector('#reviews-display-ul');
    const displayPrice = document.querySelector('#price');
    const mealIdToOption = document.querySelector('#meal-id-in-option');

    // Fetch and render corresponding meal
    fetch(`http://localhost:3000/api/meals/${id}`)
    .then(resp => resp.json())
    .then(meal => {
        console.log(meal);
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('container');
        mealDiv.classList.add('py-2');
        mealDiv.innerHTML = `
                            <h2>${meal[0].title}</h2>
                            <p>${meal[0].description}</p>
                            <p>Price: ${meal[0].price} /person</p>
                            <p>When: ${meal[0].when}</p>
                            <p>Location: ${meal[0].location}</p>`;
        mealSection.appendChild(mealDiv);
        displayPrice.innerHTML = `${meal[0].price}Dkk per guest`;
        mealIdToOption.innerHTML = `${meal[0].id}`;
    });
    // Fetch and render reviews
    fetch(`http://localhost:3000/api/reviews/${id}`)
    .then(resp => resp.json())
    .then(reviews => {
        console.log(reviews);
        reviews.forEach((review) => {
            const reviewLi = document.createElement('li');
            reviewLi.classList.add("row");
            reviewLi.classList.add("py-2");
            reviewLi.innerHTML = `
                            <div class="col-sm">
                                <h2>${review.title}</h2>
                                <p>${review.description}</p>
                                <p>Stars: ${review.stars}</p>
                            </div>
                            <div class="col-sm position-relative">
                                <div>
                                    <img src="" alt="meal-image">
                                </div>
                            </div>;`

            reviewsUl.appendChild(reviewLi);                  
        }) 
    });
};


const submitBtn = document.querySelector('#submit-btn');
const bookingCard = document.querySelector('#booking-card');
submitBtn.addEventListener('click', () => {
    bookingCard.innerHTML = `<p class="text-center">Your booking is sent.<p>`
    console.log('hello');
});


export default renderIdMeal;