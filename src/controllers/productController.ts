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


router.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { corpId, name, description, price, amount, corpName } = req.body;

  try {
    const product = await Products.findByPk(id);

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    await product.update({
      corpId,
      name,
      description,
      price,
      amount,
      corpName,
    });

    res.status(200).send({ message: "Product successfully updated" });
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

router.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Products.findByPk(id);

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    await product.destroy();
    res.status(200).send({ message: "Product successfully deleted" });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
});

export default router;
