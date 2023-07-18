// importando express
import express from 'express';
// criando a const router e executando a função router do express
const router = express.Router();
// importando o services de usuário
import userController from '../controllers/user.controller.js';
// importando o modulo de middlewares

// rotas

// rota que busca todos os usuários
router.get("/", userController.findAll);

// rota para criar usuário
router.post("/", userController.create);

export default router;