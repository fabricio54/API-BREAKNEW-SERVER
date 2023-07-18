// importando o mongoose
import mongoose from "mongoose";

// importando o bcrypt
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    avatar: {
        type: String,
        required: true
    },

    background: {
        type: String,
        required: true
    }
})

// antes de exportar esse esquema configuramos o password para ser incriptado
userSchema.pre("save", function (next) {
    // passando dois parâmetros na função de bcrypt: a string que queremos criptografar e em quantas rodadas/saltos de criptografia ele deve assumir
    this.password = bcrypt.hashSync(this.password, 10);
    // logo apos a criptografia continue o que foi progamado pra fazer
    next();
})

// crindo uma constante para guardar o esquema
const User = mongoose.model("User", userSchema);

// agora exportamos o modelo
export default User;