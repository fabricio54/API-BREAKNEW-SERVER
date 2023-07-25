// middleware: por definição e uma função que interceptara a rota de uma função de callback (no meio das duas)
// precisamos do mongoose para gerarmos as funções

// importando o mongoose
import mongoose from "mongoose";

// importando os services
import userService from "../services/user.service.js";

// criações de middlewares
const validId = (req, res, next) => {
    const id = req.params.id;

    // utilizando trycatch
    try {
        // verificando se o id e válido com o mongoose
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send();

        // logo após verificar passe para próxima função
        req.id = id;
        next();
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const validUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        // verificando se o usuário e válido
        const user = await userService.findById(id);
        
        // passando pela condição
        if(!user) res.status(404).send({message: "User not found"});

        // aproveitando para recriar o id e o user e passando logo para a próxima função
        req.id = id;
        req.user = user;
        // passando para a próxima função
        next();
    } catch (error) {
        // erro de servidor 
        res.status(500).send({ message: error.message});
    }
}

export { validId, validUser }