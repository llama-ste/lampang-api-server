import crypto from "crypto";
import moment from "moment";
import dotenv from "dotenv";
import { load } from "cheerio";

process.env.NODE_ENV === "localhost"
  ? dotenv.config({ path: ".env.local" })
  : dotenv.config({ path: ".env" });

export const generateHmac = (
  method: "POST",
  url: string,
  secretKey: string,
  accessKey: string
) => {
  const parts = url.split(/\?/);
  const [path, query = ""] = parts;

  const datetime = moment.utc().format("YYMMDD[T]HHmmss[Z]");
  const message = datetime + method + path + query;

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(message)
    .digest("hex");

  return `CEA algorithm=HmacSHA256, access-key=${accessKey}, signed-date=${datetime}, signature=${signature}`;
};

export const getAffiliateUrl = async (url: string) => {
  const REQUEST_METHOD = "POST";
  const DOMAIN = "https://api-gateway.coupang.com";
  const URL = "/v2/providers/affiliate_open_api/apis/openapi/v1/deeplink";

  const ACCESS_KEY = process.env.COUPANG_ACCESS_KEY ?? "";
  const SECRET_KEY = process.env.COUPANG_SECRET_KEY ?? "";

  const REQUEST = { coupangUrls: [url], subId: "llamaste" };

  try {
    const authorization = generateHmac(
      REQUEST_METHOD,
      URL,
      SECRET_KEY,
      ACCESS_KEY
    );

    const response = await fetch(`${DOMAIN}${URL}`, {
      method: REQUEST_METHOD,
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(REQUEST),
    });

    const data = await response.json();

    const affilateURL = data["data"][0]["shortenUrl"];

    return affilateURL;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export const crawlingAndGetData = async (productUrl: string) => {
  try {
    const response = await fetch(productUrl, {
      method: "GET",
      redirect: "follow",
    });

    const html = await response.text();

    const $ = load(html);

    const imageUrl = `https:${$("div.prod-image .prod-image__detail").attr(
      "src"
    )}`;
    const name = $("div.prod-buy-header h2.prod-buy-header__title").text();
    const price = $("div.prod-price span.total-price strong")
      .text()
      .replace(/[^0-9]/g, "");

    const isInValid =
      imageUrl.length === 0 || name.length === 0 || price.length === 0;

    if (isInValid) throw new Error("올바른 URL을 보내주세요.");

    return { imageUrl, name, price: Number(price) };
  } catch (err) {
    throw new Error(`${err}`);
  }
};
