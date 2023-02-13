import { RequestHandler } from "express";
import { Category } from "../../models/category";

const getCategories: RequestHandler = async (req, res, next) => {
  try {
    const categories = (
      await Category.findAll({ order: [["order", "ASC"]] })
    ).map((v) => v.get());

    return res.json(categories);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export default getCategories;
