module.exports = (sequelize, DataTypes) => {
    const Restaurant = sequelize.define("Restaurant", {
        restaurantName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        zipcode: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        occasion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Restaurant.associate = (db) => {
        Restaurant.belongsTo(db.User)
    }

    return Restaurant;
};

// Needs html page with buttons and submit information/form