// Not in use yet
function reservationRouter () {
  document.body.innerHTML = `
        <header class="container"> 
            
            <nav class="navbar navbar-light navbar-expand-sm d-flex justify-content-between">
                <a class="navbar-brand d-block" href="https://hyf-mealsharing.herokuapp.com">Logo</a>
                
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
        <div class="text-center container">
            <h1> This feature is not available yet </1>
            <h2>The developer is still working on it, so come back later.</h2>
        </div>`;
}

reservationRouter ();

export default reservationRouter;
