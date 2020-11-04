$(document).ready(() => {


    const deleteReview = $(".deleteReview");
    const reviewCard = $(".reviewCard");
    

    $.get("/api/user_data").then(data => {
        $("#profileName").text(data.firstName + " " + data.lastName + "'s FoodBook" );
    });


    //this code works
    $("#addreview").on("click", event => {
       event.preventDefault();
       console.log("You succesfully clicked addreview button on the internet");
       console.log("the user's id number is: " + userNumber);
       $.post("/api/newReview")
    });

    function displayFriend ( {id} ) {
        console.log(id);
        $.get("/api/restaurant_data/" + id).then(data => {
            console.log(data)
            for (let index = 0; index < data.length; index++) {
                const resName = data[index].restaurantName;
                const foodType = data[index].foodType
                const rating = data[index].rating
                const description = data[index].description
                const occasion = data[index].occasion
                const price = data[index].price
                // $(`#restaurantResult${index}`).text(data[index].restaurantName)
                console.log(resName, foodType, rating, description, occasion, price)
                const cardBody = `
                <div class="container">
            <div class="row justify-content-center">
            <div class="card shadow  bg-white rounded" style="width: 35rem; reviewCard">
            <img src="/assets/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg" class="card-img-top" alt="..." height="300px">
            
            <div class="card-body">
                <div class="row">
                    <p id="restaurant" class="filterTitle col-3">Restaurant</p>
                    <p id="foodType" class="filterTitle col-2">Food Type</p>
                    <p id="rank" class="filterTitle col-2">Rank</p>
                    <p id="price" class="filterTitle col-2">Price</p>
                    <p id="occasion" class="filterTitle col-3">Occasion</p>
                </div>
                <div class="row resultsRow">
                    <div class="col-3">
                        <p id="restaurantResult" class="results ">${resName}</p>
                    </div>
                    <div class="col-2">
                        <p id="restaurantResult" class="results ">${foodType}</p>
                    </div>
                    <div class="col-2">
                        <p id="rankResult" class="results">${rating}</p>
                    </div>
                    <div class="col-2">
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
    
            $("#cardPopulation").prepend(cardBody);
            }
            
        })
    }

    // find friend id api call
    $("#friendSearch").submit("click", event => {
        event.preventDefault();
        console.log("You succesfully clicked search friend button");
        let friend = $("#friendName").val();
        console.log("the user's friend name is: " + friend);
        $.get(`/api/findFriendId/${friend}`).then(data =>{
            console.log(data);
            for (let i=0; i < data.length; i++){
                displayFriend(data[i]);
            }   
        })
     });


    const apiDelete = (data) => {
        return $.ajax({
          url: "api/restaurant_data/" + data,
          method: "DELETE",
        }).then(() => {
            window.location.reload();
        });
      };

    $(document).on("click", ".deleteReview",
       function (event) {
        event.preventDefault();
        console.log("Review has been deleted")
        console.log(this)

       const resname = $(this).attr("data-resname")
       console.log(resname); 
       apiDelete(resname);
    });


    displayRestaurants();

    function displayRestaurants () { 
        $.get("/api/restaurant_data").then(data => {
        for (let index = 0; index < data.length; index++) {
            const resName = data[index].restaurantName;
            const foodType = data[index].foodType
            const rating = data[index].rating
            const description = data[index].description
            const occasion = data[index].occasion
            const price = data[index].price
            const cardBody = `
            <div class="container">
            <div class="row justify-content-center">
            <div class="card shadow  bg-white rounded" style="width: 35rem; reviewCard">
            <img src="/assets/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg" class="card-img-top" alt="..." height="300px">
            <a data-resName="${resName}" class="deleteReview" href="/members" style="text-align: right" style="color: black" style="margin-right:10px">X</a>
            <div class="card-body">
                <div class="row">
                    <p id="restaurant" class="filterTitle col-3">Restaurant</p>
                    <p id="foodType" class="filterTitle col-2">Food Type</p>
                    <p id="rank" class="filterTitle col-2">Rank</p>
                    <p id="price" class="filterTitle col-2">Price</p>
                    <p id="occasion" class="filterTitle col-3">Occasion</p>
                </div>
                <div class="row resultsRow">
                    <div class="col-3">
                        <p id="restaurantResult" class="results ">${resName}</p>
                    </div>
                    <div class="col-2">
                        <p id="restaurantResult" class="results ">${foodType}</p>
                    </div>
                    <div class="col-2">
                        <p id="rankResult" class="results">${rating}</p>
                    </div>
                    <div class="col-2">
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

        $("#cardPopulation").prepend(cardBody);
        }
        
    })
}
function displaySearch (data) { 
    for (let index = 0; index < data.length; index++) {
        const resName = data[index].restaurantName;
        const foodType = data[index].foodType
        const rating = data[index].rating
        const description = data[index].description
        const occasion = data[index].occasion
        const price = data[index].price
        const cardBody = `
        <div class="container">
        <div class="row justify-content-center">
        <div class="card shadow  bg-white rounded" style="width: 35rem; reviewCard">
        <img src="/assets/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg" class="card-img-top" alt="..." height="300px">
        <div class="card-body">
            <div class="row">
                <p id="restaurant" class="filterTitle col-3">Restaurant</p>
                <p id="foodType" class="filterTitle col-2">Food Type</p>
                <p id="rank" class="filterTitle col-2">Rank</p>
                <p id="price" class="filterTitle col-2">Price</p>
                <p id="occasion" class="filterTitle col-3">Occasion</p>
            </div>
            <div class="row resultsRow">
                <div class="col-3">
                    <p id="restaurantResult" class="results ">${resName}</p>
                </div>
                <div class="col-2">
                    <p id="restaurantResult" class="results ">${foodType}</p>
                </div>
                <div class="col-2">
                    <p id="rankResult" class="results">${rating}</p>
                </div>
                <div class="col-2">
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
    
    $("#cardPopulation").prepend(cardBody);
    }
}

    $("#changePrice").on("change", "select", function (event) {
        event.preventDefault();
        console.log("You succesfully changed the price");
        let newPrice = $("#changePrice option:selected").text()
        console.log("the new price to search for is: " + newPrice);
        $.get(`/api/filterBtn/${newPrice}`).then(data =>{
            console.log(data);
            $("#cardPopulation").empty();
            displaySearch(data)
        })
    })   

    $("#changeRating").on("change", "select", function (event) {
        event.preventDefault();
        console.log("You succesfully changed the rating");
        let newRating = $("#changeRating option:selected").val()
        console.log("the new rating to search for is: " + newRating);
        $.get(`/api/filterRating/${newRating}`).then(data =>{
            console.log(data);
            $("#cardPopulation").empty();
            displaySearch(data)
        })
    })

    $("#changeLocation").on("change", "select", function (event) {
        event.preventDefault();
        console.log("You succesfully changed the location");
        let newLocation = $("#changeLocation option:selected").val()
        console.log("the new location to search for is: " + newLocation);
        $.get(`/api/filterLocation/${newLocation}`).then(data =>{
            console.log(data);
            displaySearch(data);
        })
    })

    $("#changeFoodType").on("change", "select", function (event) {
        event.preventDefault();
        console.log("You succesfully changed the food type");
        let newFoodType = $("#changeFoodType option:selected").text();
        console.log("the new food type to search for is: " + newFoodType);
        $.get(`/api/filterFoodType/${newFoodType}`).then(data =>{
            console.log(data);
            $("#cardPopulation").empty();
            displaySearch(data)
        })
    })

    $("#changeOccasion").on("change", "select", function (event) {
        event.preventDefault();
        console.log("You succesfully changed the occasion");
        let newOccasion = $("#changeOccasion option:selected").text();
        console.log("the new occasion to search for is: " + newOccasion);
        $.get(`/api/filterOccasion/${newOccasion}`).then(data =>{
            console.log(data);
            $("#cardPopulation").empty();
            displaySearch(data)
        })
    })
 
});