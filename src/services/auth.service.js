import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// como o campo password foi configurado para não ser selecionado o fazemos quando chamamos a função que recebe um email e retorna o usuario e o campo que definimos que não configurado
const loginService = (email) => User.findOne({email: email}).select("+password");

// adicionando a função sign do jwt temos que passar 3 parâmetros: payload (dado que queremos criptografar e adicionar a chave json), um texto criptografado no gerador de hash md5, e um objeto que tem o tempo que essa chave expira 
const gererateToken = (id) => jwt.sign({id: id}, process.env.SECRET_JWT, {expiresIn: 56400});

export { loginService, gererateToken };