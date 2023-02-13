import { RequestHandler } from "express";

const get404: RequestHandler = (req, res) => {
  res.status(404).json({ message: "Not Found!" });
};

export { get404 };
