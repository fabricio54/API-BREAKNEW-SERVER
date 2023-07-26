// importando modulos
import newsModel from '../models/News.js';

const createService = (body) => newsModel.create(body);

const findAllService = () => newsModel.find();

export {
    createService,
    findAllService
}

