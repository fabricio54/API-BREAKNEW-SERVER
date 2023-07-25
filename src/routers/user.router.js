// importando express
import express from 'express';
// criando a const router e executando a função router do express
const router = express.Router();
// importando o services de usuário
import userController from '../controllers/user.controller.js';
// importando o modulo de middlewares
import {validId, validUser} from '../middlewares/global.middleware.js';
// rotas
// rota que busca usuário pelo id
router.get("/:id", validId, validUser, userController.findById);
// rota que busca todos os usuários
router.get("/", userController.findAll);

// rota para criar usuário
router.post("/", userController.create);

// rota de atualização de usuário
router.patch("/:id", validId, validUser, userController.update);

export default router;