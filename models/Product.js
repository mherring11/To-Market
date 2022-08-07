const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Product extends Model
{

}

// define table columns and configuration
Product.init(
    {
      // define an id column
      id : {
          // use the special Sequelize DatTypes object provide what ype of data it is
          type: DataTypes.INTEGER,
          // this is the equivalent of SQL's NOT NULL option
          allowNull: false,
          //instruct that this is the Primary Key
          primaryKey: true,
          // turn on auto increment
          autoIncrement: true
      },
      // define a username column
      product_name : {
          type: DataTypes.STRING,
          allowNull: false,
      },
      // Define a password column
      category: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [4]
          }
      },
      description: {
            type: DataTypes.STRING,
            validate: {
                len: [1]
            }
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
      }
    },
    {
      // pass in our imported sequelize connection (the direct connection to our database)
      sequelize,
      // don't automatically create createdAt/updatedAt timestamp fields
      timestamps: false,
      // don't pluralize name of database table
      freezeTableName: true,
      // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
      underscored: true,
      // make it so our model name stays lowercase in the database
      modelName: 'product'
    }
);

module.exports = Product;