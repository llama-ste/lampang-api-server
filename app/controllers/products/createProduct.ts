import { RequestHandler } from "express";
import { Product } from "../../models/product";

const createProduct: RequestHandler = async (req, res, next) => {
  const {
    body: { categoryId, imageUrl, name, price, description, affiliateUrl },
  } = req;

  const userId = req.user?.id;

  try {
    const product = {
      categoryId,
      imageUrl,
      name,
      price,
      description,
      affiliateUrl,
      userId,
    };

    const result = (await Product.create(product)).get();
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export default createProduct;
