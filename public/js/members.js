$(document).ready(() => {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(data => {
        $(".member-name").text(data.email);
    });

    $("#addreview").on("click", event => {
        event.preventDefault();
       console.log("You succesfully clikced addreveiew button on the internet")
       $.post("/api/newReview")
    });

    
    $.get("/api/restaurant_data").then(data => {
        for (let index = 0; index < data.length; index++) {
            const resName = data[index].restaurantName;
            const rating = data[index].rating
            const description = data[index].description
            const occasion = data[index].occasion
            const price = data[index].price
            // $(`#restaurantResult${index}`).text(data[index].restaurantName)
            console.log(resName, rating, description, occasion,price)
            const cardBody = `
            <div class="container">
            <div class="row justify-content-center">
            <div class="card shadow  bg-white rounded" style="width: 25rem;">
            <img src="./public/assets/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <div class="row">
                    <p id="restaurant" class="filterTitle col-3">Restaurant</p>
                    <p id="rank" class="filterTitle col-3">Rank</p>
                    <p id="price" class="filterTitle col-3">Price</p>
                    <p id="occasion" class="filterTitle col-3">Occasion</p>
                </div>
                <div class="row resultsRow">
                    <div class="col-3">
                        <p id="restaurantResult" class="results ">${resName}</p>
                    </div>
                    <div class="col-3">
                        <p id="rankResult" class="results">${rating}</p>
                    </div>
                    <div class="col-3">
                        <p id="priceResult" class="results">${price}</p>
                    </div>
                    <div class="col-3">
                        <p id="occasionResult" class="results">${occasion}</p>
                    </div>
                </div>
                <p class="noteTitle">Notes</p>
                <p class="card-text">${description}
                </p>
            </div>
        </div>
        </div>
        </div>`;

        $("#cardPopulation").append(cardBody);


        }
        
    })
});


