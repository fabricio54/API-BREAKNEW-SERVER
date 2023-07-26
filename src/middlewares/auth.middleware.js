// importando modulos
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userService from "../services/user.service.js";

// configurações
dotenv.config();

export const authMiddleware = (req, res, next) => {
    try {
        // pegando o objeto passado nos headers
        const { autorization } = req.headers;

        // verificando se o usuário está autorizado a entrar. se não retorna o status http 401 de não autorizado
        if(!autorization) {
            return res.send(401);
        }

        // desmembrando o autorization em um array com a função split do js
        const parts = autorization.split(" ");

        // vericando se o arrays parts tem um tamanho de 2
        if(parts.lenght !== 2) {
            res.send(401);
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
                res.status(401).send({ message: "Token invalid" });
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


