import { RequestHandler } from "express";
import { crawlingAndGetData, getAffiliateUrl } from "../../service/coupang";

const getCoupangItem: RequestHandler = async (req, res, next) => {
  const url: string = req.params.url;
  try {
    const data = await Promise.all([
      crawlingAndGetData(url),
      getAffiliateUrl(url),
    ]);

    const responseData = {
      ...data[0],
      affiliateUrl: data[1],
    };

    return res.json(responseData);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export default getCoupangItem;
