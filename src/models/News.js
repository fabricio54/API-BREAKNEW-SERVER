// importações
import mongoose from "mongoose";

// criando um esquema
const NewsSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },

    text: {
        type: String,
        require: true,
    },

    banner: {
        type: String,
        require: true,
    },

    createAt: {
        type: Date,
        default: Date.now(),
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },

    likes: {
        type: Array,
        require: true, 
    },

    comments: {
        type: Array,
        require: true,
    }

})

// criando um modelo com base no schema criado
const News = mongoose.model("News", NewsSchema);

// exportando o modelo para outros modulos
export default News;