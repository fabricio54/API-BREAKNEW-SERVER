// importando modulos
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userService from "../services/user.service.js";

// configurações
dotenv.config();

export const authMiddleware = (req, res, next) => {
    try {
        // pegando o objeto passado nos headers
        const { authorization } = req.headers;

        // verificando se o usuário está autorizado a entrar. se não retorna o status http 401 de não autorizado
        if(!authorization) {
            return res.status(401).send({message: "user not authorization"});
        }

        // desmembrando o autorization em um array com a função split do js
        const parts = authorization.split(" ");

        // vericando se o arrays parts tem um tamanho de 2
        if(parts.length !== 2) {
            res.status(401).send({ message: "invalid lenght"});
        }

        // descontroindo esse array
        const [ schema, token ] = parts;

        // verificando o valor de schema
        if(schema !== "Bearer") {
            res.send(401);
        }

        // validando o token

        // função do jwt que vai validar o token. essa função recebe três parâmetros: token, secrety variavel e uma função de callback que recebe o erro e o objeto

        jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
            if(error){
                return res.status(401).send({ message: "Token invalid" });
            };
            // consultando se o id e válido
            const user = await userService.findById(decoded.id);

            if(!user || !user.id) {
                return res.status(401).send({ message: "Invalid token" });
            }
            // criando um user id para passar para a próxima função que deve ter o id do usuário
            req.userId = user.id;

            // passando para a próxima função
            return next();
        })



    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}


