$(document).ready(() => {
    const restName = $("#restaurantInput");
    const foodType = $("#foodTypeInput");
    const rating = $("#ratingInput");
    const price = $("#priceInput");
    const occasion = $("#occasionInput");
    const zipcode = $("#zipCodeInput");
    const description = $("#description")
    const reviewSubmit = $("#reviewSubmit");
    const reviewForm = $("#reviewForm");


    reviewForm.on("submit", event => {
        event.preventDefault();
        const restaurantData = {
            restName: restName.val().trim(),
            rating: rating.val().trim(),
            foodType: foodType.val().trim(),
            price: price.val().trim(),
            zipcode: zipcode.val().trim(),
            occasion: occasion.val().trim(),
            description: description.val().trim(),
        };
    console.log(restaurantData)
        if (!restaurantData.restName || !restaurantData.rating ||!restaurantData.price || !restaurantData.occasion || !restaurantData.description) {
            return;
        }

        reviewInfo(restaurantData.restName, restaurantData.rating , restaurantData.foodType, restaurantData.zipcode, restaurantData.price, restaurantData.occasion, restaurantData.description);
        restName.val(""),
        rating.val(""),
        foodType.val("")
        price.val(""),
        zipcode.val(""),
        occasion.val(""),
        description.val("");

});


function reviewInfo(restName ,rating, foodType, zipcode, price, occasion, description) {
    $.post("/api/newReview", {
        restName: restName,
        rating: rating,
        foodType: foodType,
        zipcode: zipcode,
        price: price,
        occasion: occasion,
        description: description
    }).then(() => {
        window.location.replace("/members");
    }).catch(handleReviewErrors); // If there's an error, handle it by throwing up a bootstrap alert
}

function handleReviewErrors(err) {
    let message;
    if (err && err.responseJSON && err.responseJSON.errors && err.responseJSON.errors[0]) {
        message = err.responseJSON.errors[0].message;
    } else {
        message = "An unknown error occurred; please try again later";
    }
    console.warn(`Review error; message: ${message}`);
    $("#alert.msg").text(message);
    $("#alert").fadeIn(500);
}
});


    