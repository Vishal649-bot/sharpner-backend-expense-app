const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const expense = sequelize.define('expense', {
    // Define the attributes of your model
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
    itemname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
     
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false,
        
      },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    // Add more attributes as needed
  });

  sequelize.sync().then(() => {
    console.log("General model synchronized successfully");
  });
  
  module.exports = expense;