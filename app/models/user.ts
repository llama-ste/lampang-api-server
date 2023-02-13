import { DataTypes, Optional, ModelDefined } from "sequelize";
import { sequelize } from ".";

export interface IUserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface IUserCreationAttributes
  extends Optional<IUserAttributes, "id"> {}

export const User: ModelDefined<IUserAttributes, IUserCreationAttributes> =
  sequelize.define(
    "user",
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
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      tableName: "users",
    }
  );
