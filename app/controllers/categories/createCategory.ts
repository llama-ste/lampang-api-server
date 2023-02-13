import { RequestHandler } from "express";
import { Category } from "../../models/category";

const createCategory: RequestHandler = async (req, res, next) => {
  try {
    const name = req.body.name;

    const totalCount = await Category.count();

    const category = {
      name,
      order: totalCount + 1,
    };

    const result = (await Category.create(category)).get();

    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json(`${err}`);
  }
};

export default createCategory;
