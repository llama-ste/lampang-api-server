import { RequestHandler } from "express";
import { Order, OrderItem } from "sequelize";
import { Product } from "../../models/product";

interface IOrderOptions {
  [name: string]: [string, string][];
}

const getProducts: RequestHandler = async (req, res, next) => {
  try {
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
      offset,
      limit,
      order: orderOption,
    });

    const totalCount = products.count;

    const totalPage =
      totalCount % limit === 0
        ? totalCount / limit
        : Math.ceil(totalCount / limit);

    const isLastPage =
      totalCount - limit * numPage <= 0 &&
      totalCount - limit * numPage >= -limit;

    const nextPage = totalCount - limit * numPage > 0 ? numPage + 1 : null;

    const pagination = {
      per: limit,
      totalCount,
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

export default getProducts;
