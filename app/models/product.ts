import { ModelDefined, DataTypes, Optional } from "sequelize";
import { sequelize } from ".";
import { Category } from "./category";
import { User } from "./user";

interface IProductAttributes {
  id: number;
  name: string;
  price: number;
  description: string;
  affiliateUrl: string;
  imageUrl: string;
  userId: number;
  categoryId: number;
}

interface IProductCreationAttributes
  extends Optional<IProductAttributes, "id" | "userId" | "categoryId"> {}

export const Product: ModelDefined<
  IProductAttributes,
  IProductCreationAttributes
> = sequelize.define(
  "product",
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
      validate: {
        notEmpty: true,
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    affiliateUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      field: "userId",
      onDelete: "CASCADE",
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "id",
      },
      field: "categoryId",
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "products",
  }
);

// Product.belongsTo(Category, {
//   constraints: true,
//   onDelete: "CASCADE",
// });
// Product.belongsTo(User, {
//   constraints: true,
//   onDelete: "CASCADE",
// });
