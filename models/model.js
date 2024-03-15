const { Sequelize, DataTypes, Model } = require("sequelize");

// Initialize Sequelize with your database credentials
const sequelize = new Sequelize("kitra_game", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

class Treasure extends Model {}
Treasure.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    name: DataTypes.STRING,
  },
  { timestamps: false, sequelize, modelName: "treasure" }
);

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
  },
  { timestamps: false,sequelize, modelName: "user" }
);

class MoneyValue extends Model {}
MoneyValue.init(
  {
    id: {
      field: "treasure_id",
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    amt: DataTypes.INTEGER,
  },
  { timestamps: false,sequelize, modelName: "moneyValue" }
);

Treasure.hasMany(MoneyValue, { foreignKey: "treasure_id" });
MoneyValue.belongsTo(Treasure, { foreignKey: "treasure_id" });

module.exports = { Treasure, MoneyValue, User, sequelize };
