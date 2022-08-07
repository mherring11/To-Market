const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const fileUpload = require('express-fileupload');

class Product extends Model
{

}

Product.init(
    {
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
      },
      image: {
          type: DataTypes.STRING,
          allowNull: false
      },
      product_name : {
          type: DataTypes.STRING,
          allowNull: false
      },
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
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
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