// importando modulos
import newsModel from '../models/News.js';

const createService = (body) => newsModel.create(body);

const findAllService = (limit, offset) => newsModel.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const countNews = () => newsModel.countDocuments();

const topNewsService = () => newsModel.findOne().sort({ _id: -1 }).populate("user");

const findByIdService = (id) => newsModel.findById(id).populate("user");

const searchByTitleService = (title) => newsModel.find({
    title: { $regex: `${title || ""}`, $options: "i" }
})
    .sort({ _id: -1 })
    .populate("user");

const byUserService = (id) => newsModel.find({ user: id })
    .sort({ _id: -1 })
    .populate("user");

// atualizando os campos da collection de news
const updateService = (id, title, text, banner) => newsModel.findOneAndUpdate({ _id: id }, { title, text, banner }, { rawResult: true });

const eraseService = (id) => newsModel.findOneAndDelete({ _id: id });

const likeNewsService = (idNews, userId) => newsModel.findOneAndUpdate({ _id: idNews, "likes.userId": { $nin: [userId] } }, { $push: { likes: { userId, created: new Date() } } });

const deleteLikeNewsService = (idNews, userId) => newsModel.findOneAndUpdate({ _id: idNews }, { $pull: { likes: { userId } } });

export {
    createService,
    findAllService,
    countNews,
    topNewsService,
    findByIdService,
    searchByTitleService,
    byUserService,
    updateService,
    eraseService,
    likeNewsService,
    deleteLikeNewsService,
}

