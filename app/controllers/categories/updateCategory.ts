import { RequestHandler } from "express";
import { Category } from "../../models/category";

const updateCategory: RequestHandler = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const categoryName = req.body.name;

    const category = await Category.findByPk(categoryId);
    if (category === null)
      return res.status(400).json({ message: "카테고리가 존재하지 않습니다." });

    const updatedCategory = (
      await category.update({
        name: categoryName,
      })
    ).get();

    return res.json(updatedCategory);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export default updateCategory;
