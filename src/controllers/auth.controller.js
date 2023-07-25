// importando o modulo de serviços de autenticação
import { loginService, gererateToken } from "../services/auth.service.js";
// importando o módulo de bcrypt
import bcrypt from "bcrypt";

const login = async (req, res) => {
    const { email, password } = req.body;
    // verificamos se tem erro no servidor
    try {
        // verificamos se o email é válido
        const user = await loginService(email);

        // se não for válido geraremos um erro de usuário
        if(!user) {
            return res.status(404).send({ message: "User or Password not found"});
        }

        // após passarmos pela condição acima coparamos as senhas: a senha normal com a senha no banco de dados ( a própria função do bcrypt converterá o password para comparação )
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        // se a senha não for válida gerará esse erro
        if(!passwordIsValid) res.status(404).send({ message: "User or Password not found"});

        // caso passe na condição geraremos um token de autenticação com o id retornado do usuário
        const token = gererateToken(user.id);

        res.send({ token : token });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export { login };