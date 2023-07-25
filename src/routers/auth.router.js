// importando o express
import express from "express";
// criando as rotas de auth
const authRouter = express.Router();
// importando os services de authRouter
import { login } from "../controllers/auth.controller.js";

authRouter.post("/", login);

export default authRouter;