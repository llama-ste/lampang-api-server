import { RequestHandler } from "express";
import { Category } from "../../models/category";

const deleteCatrgory: RequestHandler = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);

    if (category === null)
      return res.status(400).json({ message: "카테고리가 존재하지 않습니다." });

    await category.destroy();
    const categories = await Category.findAll({ order: [["order", "ASC"]] });

    await Promise.all(
      categories.map((category, i) => {
        return category.update({ order: Number(i) + 1 });
      })
    );

    return res.json({ message: "삭제되었습니다." });
  } catch (err) {
    return res.status(400).json(err);
  }
};

export default deleteCatrgory;
