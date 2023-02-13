import { DataTypes, Optional, ModelDefined } from "sequelize";
import { sequelize } from ".";

interface ICategoryAttributes {
  id: number;
  name: string;
  order: number;
}

interface ICategoryCreationAttributes
  extends Optional<ICategoryAttributes, "id" | "order"> {}

export const Category: ModelDefined<
  ICategoryAttributes,
  ICategoryCreationAttributes
> = sequelize.define(
  "category",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { tableName: "categories" }
);
