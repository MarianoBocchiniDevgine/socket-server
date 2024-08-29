import { Router } from "express";
import Corps from "../models/corps";

const router = Router();

router.post("/corps", async (req, res) => {
  const { corpName } = req.body;
  try {
    const corp = await Corps.create({
      corpName,
    });
    res.status(201).send({ message: "Corp successfully registered" });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error });
  }
});

router.get("/corps", async (req, res) => {
  try {
    const corps = await Corps.findAll({});
    res.send(corps);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.put("/corps/:id", async (req, res) => {
  const { id } = req.params;
  const { corpName } = req.body;

  try {
    const corp = await Corps.findByPk(id);

    if (!corp) {
      return res.status(404).send({ message: "Corp not found" });
    }

    await corp.update({ corpName });
    res.send({ message: "Corp successfully updated" });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error });
  }
});

router.delete("/corps/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const corp = await Corps.findByPk(id);

    if (!corp) {
      return res.status(404).send({ message: "Corp not found" });
    }

    await corp.destroy();
    res.send({ message: "Corp successfully deleted" });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error });
  }
});

export default router;
