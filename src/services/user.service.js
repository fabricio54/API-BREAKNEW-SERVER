// importando o mongoose
import User from "../models/User.js";

// função para cadastrar usuário
const create = (body) => User.create(body);

const findById = (id) => User.findById(id);

const findAll = () => User.find();

const updateService = (id,
    name,
    username,
    email,
    password,
    avatar,
    background
) => 
    User.findOneAndUpdate(
        {_id: id},
        { 
           name,
           username,
           email,
           password,
           avatar,
           background
    });

export default {
    create,
    findById,
    findAll,
    updateService
};