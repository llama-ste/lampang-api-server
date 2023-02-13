import { RequestHandler } from "express";
import { Product } from "../../models/product";

const deleteProduct: RequestHandler = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByPk(productId);

    if (product === null)
      return res.status(400).json({ message: "상품이 존재하지 않습니다." });

    await product.destroy();
    return res.json({ message: "삭제되었습니다." });
  } catch (err) {
    return res.status(400).json(err);
  }
};

export default deleteProduct;
