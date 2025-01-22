//This function is to call the movies api and get all the movies
//that is showing in Shaw Theatres for Showing Now and Coming Soon
function getRestaurantData() {
    var request = new XMLHttpRequest();
    request.open('GET', restaurant_url, true);

    //This function will be called when data returns from the web api
    request.onload = function() {
    //get all the movies records into our movie array
    restaurant_array = JSON.parse(request.responseText);

    fetchComments();
    //call the function so as to display all movies tiles for "Now Showing"
    displayMovies(category);
    };
    //This command starts the calling of the movies web api
    request.send();
}

//This function is to display the movies tiles
//that filters based on "Now Showing" or "Coming Soon“
function displayRestaurant(category) 
{    
    var table = document.getElementById("restaurantTable");    
    var restaurantCount = 0;    
    var message = "";    

    table.innerHTML = "";    
    totalRestaurants = restaurant_array.length;    
    for (var count = 0; count < totalRestaurants; count++) 
    {        
        if (restaurant_array[count].availability == category) 
        {            
            var thumbnail = movie_array[count].thumb;            
            var title = movie_array[count].title;            
            var cell = '<div class="col-md-3" style="float: none; margin: 0 auto;">' +                          
                            '<div class="flip-container" >' +              
                                '<div class="flipper">' +
                                    '<div class="front">' + 
                                        '<a id="movies" href="#" data-toggle="modal" data-target="#movieModal" item=' + count + '>'+
                                            '<img class="img-fluid img-thumbnail" src=' + thumbnail + ' />'+
                                        '</a>'+
                                    '</div>'+                              
                                    '<div class="back">'+                                   
                                        '<div class="bg-dark mystyle text-center py-3" >'+
                                            '<span>' + title + '</span><br>' +
                                            '<button href="#" data-toggle="modal" data-target="#movieModal" item="' + count + '" type="button" class="btn btn-primary btn-sm" onClick="showMovieDetails(this)" >See More</button>'+                     
                                            '<button href="#" data-toggle="modal" data-target="#commentModal" item="' + count + '" type="button" class="btn btn-primary btn-sm" onClick="showMovieComments(this)" >Comments</button>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>' +
                            '</div>' +
                        '</div>'; 
             table.insertAdjacentHTML('beforeend', cell);            
             movieCount++;        
         }    
    }    
    message = restaurantCount + " Movies " + category;    
    document.getElementById("summary").textContent = message;    
    document.getElementById("parent").textContent = "";
}

//This function is to display the "Now Showing" movies
function listNowShowingMovies() {
    category = "Now Showing";
    displayMovies(category);
    document.getElementById("nowMenu").classList.add("active");
    document.getElementById("comingMenu").classList.remove("active");
    document.getElementById("aboutMenu").classList.remove("active");
}

//This function is to display the "Coming Soon" movies
function listComingMovies() {
    category = "Coming Soon";
    displayMovies(category);
    document.getElementById("nowMenu").classList.remove("active");
    document.getElementById("comingMenu").classList.add("active");
    document.getElementById("aboutMenu").classList.remove("active");
}

//This function is to display the individual movies details
//whenever the user clicks on "See More"
function showMovieDetails(element) {
    var item = element.getAttribute("item");
    currentIndex = item;
    document.getElementById("movieTitle").textContent = movie_array[item].title;
    document.getElementById("moviePoster").src = movie_array[item].poster;
    document.getElementById("genre").textContent = movie_array[item].genre;
    document.getElementById("director").textContent = movie_array[item].director;
    document.getElementById("cast").textContent = movie_array[item].cast;
    document.getElementById("release").textContent = movie_array[item].release;
    document.getElementById("advice").textContent = movie_array[item].advice;
    document.getElementById("story").textContent = movie_array[item].story;
    document.getElementById("trailer1").src = movie_array[item].video1;
    document.getElementById("trailer2").src = movie_array[item].video2;
}

//This function opens a new window/tab and loads the
//particular movie in the cinema website
function buyTicket() {
    window.open(movie_array[currentIndex].buy, "_blank");
}



