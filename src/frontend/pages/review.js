function renderHtml () {
    document.body.innerHTML =`
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
        <section id="meal-desc">

        </section>
        
        <section id="reviews">
            <div id="reviews-display-bg" class="bg-beige text-center position-relative mb-4">
                <h1 class="to-the-center" >Reviews</h1>  
            </div>
            <ul id="reviews-display-ul" class="list-unstyled container"></ul>
        </section>
        `;
}

renderHtml();


function returnId(req, router) {
    const id = req.param.id;
    const mealSection = document.querySelector('#meal-desc');
    const reviewsUl = document.querySelector('#reviews-display-ul');

    // Fetch meal
    fetch(`http://localhost:3000/api/meals/${id}`)
    .then(resp => resp.json())
    .then(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.innerHTML = `
                            <h2>${meal.title}</h2>
                            <p>${meal.description}</p>
                            <p>Price: ${meal.price} /person</p>
                            <p>When: ${meal.when}</p>
                            <p>Location: ${meal.location}</p>`
        mealSection.appendChild(mealDiv);
    });

    fetch(`http://localhost:3000/api/reviews/${id}`)
    .then(resp => resp.json())
    .then(reviews => {
        reviews.forEach((review) => {
            const reviewLi = document.createElement('li');
            reviewLi.classList.add("row");
            reviewLi.classList.add("py-2");
            reviewLi.innerHTML = `
                            <div class="col">
                                <h2>${review.title}</h2>
                                <p>${review.description}</p>
                                <p>Stars: ${review.stars}</p>
                            </div>
                            <div class="col position-relative">
                                <div class="to-the-center">
                                    <img src="" alt="meal-image">
                                    <a href="#" class="btn btn-success">Book meal</a>
                                </div>
                            </div>
                            <hr id="line-between-meals">`;

            reviewsUl.appendChild(reviewLi);
                            
        })
        
    });
    
    
};





function renderReviews() {
    
}









export default returnId;