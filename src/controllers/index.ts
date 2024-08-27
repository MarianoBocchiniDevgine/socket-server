import { Router } from "express";
import corpController from "./corpController";
import productController from "./productController";


const router = Router();

router.get('/', (req, res) => {
  res.send({
    name: "Mariano Bocchini",
    email: "marianobocchini21@gmail.com"
  })
})
router.use('/', corpController);
router.use('/', productController);

export default router;