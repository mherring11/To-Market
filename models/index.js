const User = require('./User');
const Product = require('./Product');

// Relationships
User.hasMany(Product, {
    foreignKey: "user_id"
});

Product.hasOne(User, {
    foreignKey: "user_id"
});

module.exports = {User, Product};