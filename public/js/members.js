$(document).ready(() => {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(data => {
        $(".member-name").text(data.email);
    });

    $.get("/api/restaurant_data").then(data => {
        for (let index = 0; index < data.length; index++) {
            const resName = data[index].restaurantName;
            // $(`#restaurantResult${index}`).text(data[index].restaurantName)
           
            console.log(resName)   
        }
        
    })
});


