import { RequestHandler } from "express";
import { Category } from "../../models/category";
import { Product } from "../../models/product";

interface IOrderOptions {
  [name: string]: [string, string][];
}

const getCategoryInProducts: RequestHandler = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;

    const category = await Category.findByPk(categoryId);

    if (category === null)
      return res.status(400).json({ message: "카테고리가 존재하지 않습니다." });

    const { page, per, order } = req.query;
    const numPage = Number(page) || 1;
    const limit = Number(per) || 12;
    const offset = (numPage - 1) * limit;

    const orderOptions: IOrderOptions = {
      highestPrice: [["price", "DESC"]],
      lowestPrice: [["price", "ASC"]],
      idDesc: [["id", "DESC"]],
      idAsc: [["id", "ASC"]],
    };

    const defaultOrderOption = orderOptions.idDesc;

    const isValidOrder =
      order === "highestPrice" ||
      order === "lowestPrice" ||
      order === "idDesc" ||
      order === "idAsc";

    const orderOption = isValidOrder ? orderOptions[order] : defaultOrderOption;

    const products = await Product.findAndCountAll({
      where: {
        categoryId,
      },
      offset,
      limit,
      order: orderOption,
    });

    const totalPage =
      products.count % limit === 0
        ? products.count / limit
        : Math.ceil(products.count / limit);

    const isLastPage =
      products.count - limit * numPage <= 0 &&
      products.count - limit * numPage >= -limit;

    const nextPage = products.count - limit * numPage > 0 ? numPage + 1 : null;

    const pagination = {
      per: limit,
      totalCount: products.count,
      totalPage,
      currentPage: numPage,
      nextPage,
      isLastPage,
    };

    return res.json({ products: products.rows, pagination });
  } catch (err) {
    return res.status(400).json(err);
  }
};

export default getCategoryInProducts;
