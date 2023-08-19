// importando modulos
import { createService, findAllService, countNews, topNewsService, findByIdService, searchByTitleService, byUserService, updateService, eraseService, likeNewsService, deleteLikeNewsService } from "../services/news.service.js";

export const create = async (req, res) => {
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

        res.status(201).send({ message: "News created Succefuly" });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const findAll = async (req, res) => {
    try {
        let { limit, offset } = req.query;

        if (!limit) {
            limit = 5;
        };

        if (!offset) {
            offset = 0;
        };

        limit = Number(limit);
        offset = Number(offset);

        // pegando um array de objetos 
        const news = await findAllService(limit, offset);

        // pegando total de noticias
        const total = await countNews();

        const currentUrl = req.baseUrl;

        // proxima offset
        const next = limit + offset;

        // próxima url
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

        // previous 
        const previous = offset - limit < 0 ? null : offset - limit;

        // previous url
        const previousUrl = nextUrl !== null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

        if (news.length === 0) {
            return res.status(400).send({ message: "There are no registered news" });
        }

        // array de objetos com as informações e as noticias
        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
            user: news.map((item) => [{
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                username: item.user.username,
                userAvatar: item.user.avatar
            }])
        });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const topNews = async (req, res) => {
    try {
        const news = await topNewsService();

        if (!news) {
            return res.status(400).send({ message: "There is no registered post" });
        }

        res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                username: news.user.username,
                userAvatar: news.user.avatar
            }
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const findByIdNews = async (req, res) => {
    try {
        // pegando o id dos parâmetros
        const { id } = req.params;

        // pegando noticias pelo id
        const news = await findByIdService(id);

        // verificando se a noticia existe
        if (!news) {
            res.status(400).send({ message: "news not find" });
        }

        // colocando o usuário na tela
        res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                username: news.user.username,
                userAvatar: news.user.avatar
            }
        })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const findByTitle = async (req, res) => {
    try {
        // pegando o título dos parâmetros
        const { title } = req.query;

        // filtrando todas noticas com title
        const news = await searchByTitleService(title);

        if (news.length === 0) {
            res.status(400).send({ message: "There are no news with this title" });
        }

        return res.send({
            results: news.map((item) =>
                [{
                    id: item._id,
                    title: item.title,
                    text: item.text,
                    banner: item.banner,
                    likes: item.likes,
                    comments: item.comments,
                    name: item.user.name,
                    username: item.user.username,
                    userAvatar: item.user.avatar
                }])
        })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const byUser = async (req, res) => {
    try {
        // pegando o id do middleware de autenticação caso passe
        const id = req.userId;

        // pegando as noticias que tem ligação com o id do usuário
        const news = await byUserService(id);

        // jogando na tela as noticias
        return res.send({
            results: news.map((item) => [{
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                username: item.user.username,
                userAvatar: item.user.avatar
            }]),
        })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const update = async (req, res) => {
    try {
        // pegando os dados do body
        const { title, text, banner } = req.body;

        // pegando o id do usuário da noticia
        const { id } = req.params;

        // verificando se o usuário mandou ao menos um campo
        if (!title && !text && !banner) {
            res.status(400).send({ message: "Submit at least one field to update the post" });
        }

        // pegando o news pelo id
        const news = await findByIdService(id);

        if (news.user._id != req.userId) {
            res.status(400).send({
                message: "You didn't update this post"
            })
        };

        await updateService(id, title, text, banner);

        res.send({
            message: "Post successfully updated!",
        });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const erase = async (req, res) => {
    try {

        const { id } = req.params;

        const news = await findByIdService(id);

        if (news.user._id != req.userId) {
            return res.status(400).send({
                message: "You didn't delete this post"
            })
        }

        await eraseService(id);

        res.send({ message: "News deleted successfully " });

    } catch (error) {
        res.send({ message: error.message });
    }
}

export const likeNews = async (req, res) => {
    try {
        const { id } = req.params;

        const userId = req.userId;

        const newsLiked = await likeNewsService(id, userId);

        if (!newsLiked) {
            await deleteLikeNewsService(id, userId);
            return res.status(200).send({ message: "Like successfully removed" });
        }

        res.send({ message: "Like done successfully" });


    } catch (error) {
        res.send({ message: error.message })
    }
}