import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize";
import Corps from "./corps";


class Products extends Model {
  id!: number;
}

Products.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    corpId: {
      type: DataTypes.INTEGER,
      references: {
        model: "corps",
        key: "id",
      },
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "products",
    timestamps: false,
  }
);

Corps.hasMany(Products, { foreignKey: "corpId" });
Products.belongsTo(Corps, { foreignKey: "corpId" });



export default Products;
