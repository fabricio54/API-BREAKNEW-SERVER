// importações
import express from "express";
import { create, findAll } from "../controllers/news.controller";

// criando constantes
const router = express.Router();

// rotas
router.post("/", create);

router.get("/", findAll);

export default router;