import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize";

class Corps extends Model {}

Corps.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    corpName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "corps",
    timestamps: false,
  }
);



export default Corps;
