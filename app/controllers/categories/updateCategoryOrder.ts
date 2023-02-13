import { RequestHandler } from "express";
import { Category } from "../../models/category";

const updateCategoryOrder: RequestHandler = async (req, res, next) => {
  try {
    const ids: number[] = req.body.ids;
    const categories = await Category.findAndCountAll();

    if (ids.length !== categories.count)
      return res
        .status(400)
        .json({ message: "모든 카테고리 아이디를 보내주세요." });

    await Promise.all(
      categories.rows.map((category) => {
        const findId = category.get().id;
        const findIdx = ids.indexOf(findId);
        console.log(findIdx);
        return category.update({ order: findIdx + 1 });
      })
    );

    const updatedCategories = await Category.findAll({
      order: [["order", "ASC"]],
    });

    return res.json(updatedCategories);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

export default updateCategoryOrder;
