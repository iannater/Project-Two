// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");


module.exports = (app) => {
    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), (req, res) => {
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
            email: req.user.email,
            id: req.user.id
        });
    });

    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/signup", (req, res) => {
        console.log(req.body);
        db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }).then(() => {
            res.redirect(307, "/api/login");
        }).catch(err => {
            console.warn(`failed to create user: ${err.message}`);
            res.status(500).json(err);
        });
    });

    // Route for logging user out
    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", (req, res) => {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                email: req.user.email,
                id: req.user.id
            });
        }
    });

    app.get("/api/restaurant_data/:id?", (req, res) => {
        const query = {};
        let userId = req.params.id;
        if (!userId) {
            userId = req.user.id;
        }
        query.userId = userId;
        // returning all restaurants
        db.Restaurant.findAll({
            where: query
        }).then((dbRestaurant) => {
            res.json(dbRestaurant);
        });
    });


    app.get("/api/members", (req, res) => {
        db.Restaurant.findAll().then((data) => {
            const viewData = {
                restaurants: data
            };
            console.log(viewData);
            res.render("home", viewData);

        });

    });
    app.post("/api/newReview", (req, res) => {
        console.log("reviews post:", req.body);
        const query = {};
        if (req.user) {
            query.userId = req.user.id;
        }
        db.Restaurant.create({
            restaurantName: req.body.restName,
            description: req.body.description,
            rating: req.body.rating,
            foodType: req.body.foodType,
            zipcode: req.body.zipcode,
            occasion: req.body.occasion,
            price: req.body.price,
            UserId: query.userId
        }).then(() => {
            res.json({});
        }).catch(err => {
            console.warn("failed to create restaurant:", `${err.message}`);
            res.status(500).json(err);
        });
        console.log("create restaurant:", req.body);
    });


    app.delete("/api/restaurant_data/:restaurantName", (req, res) => {
        db.Restaurant.destroy({ where: { restaurantName: req.params.restaurantName } }).then(() => {
            res.json({});
        }).catch(err => {
            console.warn("failed to delete restaurant:", `${err.message}`);
            res.status(500).json(err);
        });

    });

    // find user by id api call
    app.get("/api/findFriendId/:firstName", (req, res) => {
        console.log("starting to find friend id");
        const query = {};
        if (req) {
            query.firstName = req.params.firstName;
            console.log(query.firstName);
        }
        db.User.findAll({
            where: {
                firstName: query.firstName
            }
        }).then((data) => {

            console.log("Your friends ID: " + data);
            res.json(data);
        });
    });

    app.get("/api/filterBtn/:price", (req, res) => {
        console.log("finding the right price");
        const query = {};
        if (req) {
            query.price = req.params.price;
            console.log(query.price);
        }
        db.Restaurant.findAll({
            where: {
                price: query.price
            }
        }).then((data) => {

            console.log("Your restaurants are: " + data);
            res.json(data);
        });
    });

    app.get("/api/filterRating/:rating", (req, res) => {
        console.log("finding the right rating");
        const query = {};
        if (req) {
            query.rating = req.params.rating;
            console.log(query.rating);
        }
        db.Restaurant.findAll({
            where: {
                rating: query.rating
            }
        }).then((data) => {

            console.log("Your restaurants are: " + data);
            res.json(data);
        });
    });

    app.get("/api/filterLocation/:zipcode", (req, res) => {
        console.log("finding the right zipcode");
        const query = {};
        if (req) {
            query.zipcode = req.params.zipcode;
            console.log(query.zipcode);
        }
        db.Restaurant.findAll({
            where: {
                zipcode: query.zipcode
            }
        }).then((data) => {

            console.log("Your restaurants are: " + data);
            res.json(data);
        });
    });

    app.get("/api/filterFoodType/:foodType", (req, res) => {
        console.log("finding the right food type");
        const query = {};
        if (req) {
            query.foodType = req.params.foodType;
            console.log(query.foodType);
        }
        db.Restaurant.findAll({
            where: {
                foodType: query.foodType
            }
        }).then((data) => {

            console.log("Your restaurants are: " + data);
            res.json(data);
        });
    });

    app.get("/api/filterOccasion/:occasion", (req, res) => {
        console.log("finding the right occasion");
        const query = {};
        if (req) {
            query.occasion = req.params.occasion;
            console.log(query.occasion);
        }
        db.Restaurant.findAll({
            where: {
                occasion: query.occasion
            }
        }).then((data) => {

            console.log("Your restaurants are: " + data);
            res.json(data);
        });
    });

};



