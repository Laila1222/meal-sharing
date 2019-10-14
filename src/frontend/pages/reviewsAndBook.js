const reviewsAndBookHtml = `
    <header class="container"> 
        <nav class="navbar navbar-light navbar-expand-sm d-flex justify-content-between">
        <a class="d-block text-muted" href="https://hyf-mealsharing.herokuapp.com">MealShare <img src="../assets/logo.png" alt="logo" id="logo"</a>
            
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse ml-sm-auto" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item "><a class="nav-link" href="https://hyf-mealsharing.herokuapp.com/meals">Find a meal</a></li>
                <li class="nav-item "><a class="nav-link" href="https://hyf-mealsharing.herokuapp.com/add-meal">Become a host</a></li>
            </ul>
        </div>

        </nav>
    </header>


    <div id="reviews-display-bg" class="bg-beige text-center position-relative mb-4">
        <h1 class="to-the-center" >Reviews</h1>  
    </div>  

    <main class="container">
        <div class="row py-4 justify-content-center d-flex">
            <div class="col-sm">

                <div id="meal-desc">
                </div>

                <div id="list-reviews">
                    <ul id="reviews-display-ul" class="list-unstyled container"></ul>
                </div>
                
            </div>  

            
            <div class="card col-sm">
                <div class="card-body" id="booking-card">
                    <form id="form">
                        
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

                        <div id="number-of-guests" class="form-group">
                            <label for="number-of-guests">Guests</label>
                            <input id="number-of-guests" class="form-control">
                            
                        </div>

                        <div class="form-group">
                            <label for="message">Your personal message</label>
                            <textarea name="message" id="message" cols="30" rows="10" placeholder="Write your message here" class="form-control"></textarea>
                        </div>

                        
                        <button id="submit-btn">Send</button>
                        

                    </form>
                    
                </div>
            </div>
        </div>
    </main>`;

function renderHtml () {
  document.body.innerHTML = reviewsAndBookHtml;
}

// Render meal according the the id got from the request/url
function renderMeal (req) {
  const id = req.param.id;
  const mealSection = document.querySelector ('#meal-desc');
  const displayPrice = document.querySelector ('#price');
  const mealIdToOption = document.querySelector ('#meal-id-in-option');

  // Fetch and render corresponding meal
  fetch (`/api/meals/${id}`).then (resp => resp.json ()).then (meal => {
    const mealDiv = document.createElement ('div');
    mealDiv.classList.add ('py-2');
    mealDiv.innerHTML = `<div class="card">
                                <img class="card-img-top" alt="meal-image" src="${meal[0].img}">
                                <div class="card-body">
                                    <h2 class="card-title">${meal[0].title}</h2>
                                    <p class="card-text">${meal[0].description}</p>
                                    <p class="card-text">Price: ${meal[0].price} /person</p>
                                    <p class="card-text">When: ${meal[0].when}</p>
                                    <p class="card-text">Location: ${meal[0].location}</p>
                                    <p class="card-text">Maximum number of guests: ${meal[0].max_reservations}</p>
                                    <p class="card-text">Available places for booking: 
                                </div>
                            </div>`;
    mealSection.appendChild (mealDiv);
    displayPrice.innerHTML = `${meal[0].price}Dkk per guest`;
    mealIdToOption.innerHTML = `${meal[0].id}`;
  });
}

function rednerReviews (req) {
  const id = req.param.id;
  const reviewsUl = document.querySelector ('#reviews-display-ul');
  // Fetch and render reviews
  fetch (`/api/reviews/${id}`).then (resp => resp.json ()).then (reviews => {
    reviews.forEach (review => {
      const reviewLi = document.createElement ('li');
      reviewLi.classList.add ('row');
      reviewLi.classList.add ('py-2');
      reviewLi.innerHTML = `<div class="card">
                                <div class="card-body">
                                    <h2 class="card-title">${review.title}</h2>
                                    <p class="card-text">${review.description}</p>
                                    <p class="card-text">Stars: ${review.stars}</p>
                                </div>
                            </div>`;
      reviewsUl.appendChild (reviewLi);
    });
  });
}

// This part is not working - I am still working on it
function submitEvent () {
  const submitBtn = document.querySelector ('#submit-btn');
  submitBtn.addEventListener ('click', event => {
    event.preventDefault ();
    const bookingCard = document.querySelector('#booking-card');
    bookingCard.innerHTML = '<p>Thank you for your order.<br>We will contact you soon.</p>'

    // Still working on this part
    // const form = document.querySelector ('#form');
    // const numberOfGuests = document.querySelector ('#number-of-guests');
    // const mealId = document.querySelector ('#meal-id-in-option');
    // const createdDate = new Date ().getDate ();

    // fetch ('/api/reservations/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify ({
    //     number_of_guests: numberOfGuests.value,
    //     meal_id: mealId.value,
    //     created_date: createdDate,
    //   }),
    // })
    //   .then (res => res.json ())
    //   .then (data => {
    //     console.log (data);
    //     form.innerHTML = `        
    //             Number of your reservation is ${data.insertId}. </br>
    //             We willl contact you very soon.
    //             `;
      // });
  });
}

function mealRouter (req, router) {
  renderHtml ();
  renderMeal (req);
  rednerReviews (req);
  submitEvent ();
}

export default mealRouter;
