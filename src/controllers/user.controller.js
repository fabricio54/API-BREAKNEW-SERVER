// importando o modulo de services
import userService from "../services/user.service.js";

const create = async (req, res) => {
    try {
        // pegando os dados passados pelo usuário
        const { name, username, email, password, avatar, background } = req.body;

        // testando se todos os campos foram mandados
        if (!name || !username || !email || !password || !avatar || !background) {
            res.status(400).send({ message: "Submit all fields for registration" });
        }

        // criando usuário
        const user = await userService.create(req.body);

        // verificando se o usuário e válido
        if (!user) res.status(400).send({ message: "Error creating User" })

        res.status(201).send({
            message: "User created succefully",

            user: {
                id: user._id,
                name,
                username,
                email,
                avatar,
                background
            }
        })

    } catch (error) {
        res.status(500).send({ message: error.message });
        console.log(error);
    }
}

const findById = async (req, res) => {
    try {
        // pegando o usuario e passando 
        const user = req.user;
        // imprimindo dados na tela
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const findAll = async (req, res) => {
    try {
        // consultando os usuários no banco de dados
        const users = await userService.findAll();

        // verificando se tem usuários cadastrados
        if (!users.length === 0) res.status(400).send({ message: "There are no registered users" });

        res.send(users);

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body;

        if (!name && !username && !email && !password && !avatar && !background) {
            res.status(400).send({ message: " Submit at least one field for update" })
        }

        const { id, user } = req;

        await userService.updateService(id, name, username, email, password, avatar, background);

        res.send({ message: "User successfully updated" })

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

export default { create, findAll, findById, update }