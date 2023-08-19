// importando express
import express from 'express';
// importando a conecção ao database
import connectDatabase from './src/db/db.js';
// importando as rotas
import userRouter from './src/routers/user.router.js';
import authRouter from './src/routers/auth.router.js';
import newsRouter from './src/routers/news.router.js';
// importando o dotenv
import dotenv from "dotenv";
// criando constante app que recebe o express executando
const app = express();

// configurando o app para receber objeto json
app.use(express.json());

// executando o dotenv
dotenv.config();

// conectando ao database
connectDatabase();

// configurando o app
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/news", newsRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}!`);
})