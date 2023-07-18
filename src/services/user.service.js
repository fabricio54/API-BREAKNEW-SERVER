// importando o mongoose
import User from "../models/User.js";

// função para cadastrar usuário
const create = (body) => User.create(body);

const findById = (id) => User.findById(id);

const findAll = () => User.findAll();

export default {
    create,
    findById,
    findAll
}