// importações
import express from "express";
import { create, findAll, topNews, findByIdNews, findByTitle, byUser, update, erase, likeNews } from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

// criando constantes
const router = express.Router();

// rotas

// criação de news
router.post("/", authMiddleware, create);

// pegando noticias postadas
router.get("/", findAll);

// pegando a ultima noticia
router.get("/topnews", topNews);

// pegando a noticia pelo title
router.get("/search", findByTitle);

// pegando noticias vinculadas ao usuário que criou pelo id
router.get("/byUser", authMiddleware, byUser);

// rota de likes
router.patch("/likes/:id", authMiddleware, likeNews);

// pegando a noticia por id
router.get("/:id", authMiddleware, findByIdNews);

// route delete
router.delete("/:id", authMiddleware, erase)

// rota de atualização
router.patch("/:id", authMiddleware, update);

export default router;