import { RequestHandler } from "express";
import { Product } from "../../models/product";

const updateProduct: RequestHandler = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByPk(productId);

    if (product === null)
      return res.status(400).json({ message: "상품이 존재하지 않습니다." });

    const updateData = {
      categoryId: req.body.categoryId,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      affiliateUrl: req.body.affiliateUrl,
    };

    console.log(updateData);

    const filteredData = Object.fromEntries(
      Object.entries(updateData).filter((v) => v[1] !== undefined)
    );

    console.log(filteredData);

    const updatedProduct = (await product.update(filteredData)).get();
    return res.json(updatedProduct);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export default updateProduct;
