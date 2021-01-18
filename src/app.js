//Importa o express
const express = require("express");

//Importa as rotas
const routes = require("./routes")

require("./database");

//Cria a aplicação express
const app = express();

app.use(express.json());

app.use(routes);



//Função que vai ser executada pela rota
const listarAlunos = (req, res) => {
    res.send(alunos);
}

module.exports = app;