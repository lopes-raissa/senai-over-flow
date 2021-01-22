//Importa o express
const express = require("express");

const { errors } = require('celebrate')

//Importa as rotas
const routes = require("./routes")

require("./database");

//Cria a aplicação express
const app = express();

app.use(express.json());

//Definimos a pasta uploads como pública, servindo arquivos estáticos
app.use("/uploads", express.static("uploads"));

app.use(routes);

app.use(errors());



//Função que vai ser executada pela rota
const listarAlunos = (req, res) => {
    res.send(alunos);
}

module.exports = app;