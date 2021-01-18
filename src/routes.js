const express = require("express");

const studentController = require ("./controllers/students");
const questionController = require ("./controllers/questions");
const answersController = require("./controllers/answers");
const feedController = require("./controllers/feed");

const routes = express.Router();

//Rotas de students
routes.get("/students", studentController.index);

routes.post("/students", studentController.store);

routes.delete("/students/:id", studentController.delete);

routes.put("/students/:id", studentController.update);

routes.get("/students/:id", studentController.find);

//Rotas de questions
routes.post("/questions",questionController.store)
routes.delete("/questions/:id", questionController.delete)
routes.put("/questions/:id", questionController.update)

// Rotas de respostas
routes.post("/questions/:id/answers", answersController.store);

//Rotas do feed
routes.get("/feed", feedController.index);

module.exports = routes;