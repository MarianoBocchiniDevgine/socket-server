import { Router } from "express";
import Products from "../models/products";

const router = Router();

router.post("/products", async (req, res) => {
  const { corpId, name, description, price, amount, corpName } = req.body;

  try {
    const product = await Products.create({
      corpId,
      name,
      description, 
      price,
      amount,
      corpName, 
    });


    res.status(201).send({ message: "Product successfully registered" });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await Products.findAll({});
    res.send(products);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
