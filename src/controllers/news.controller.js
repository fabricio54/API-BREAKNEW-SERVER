// importando modulos
import { createService, findAllService } from "../services/news.service";

const create = async (req, res) => {
    try {
        // desconstruindo objeto que vem do body
        const { title, text, banner } = req.body;

        if (!title || !text || !banner) {
            return res.status(400).send({ message: "Submit all fields for registration" });
        }

        // criando as noticias
        await createService({
            title,
            text,
            banner,
            user: req.userId,
        });

        req.status(201).send({ message: "News created Succefuly"});

    } catch (error) {
        req.status(500).send({ message: error.message });
    }
};

const findAll = async (req, res) => {
    try {
        // pegando um array de objetos 
        const news = await findAllService();

        if(news.length === 0) {
            return res.status(400).send({ message: "There are no registered news"});
        }

        res.send(news);

    } catch (error) {
        res.status(500).send({message: error.message });
    }
};

export { create, findAll };
