const express = require("express");

const authMiddleare = require("./middleware/authorization");
const uploadSingleImage = require("./middleware/uploadSingleImage");

//Import das validações
const validationStudents = require("./validators/student");
const validationQuestions = require("./validators/questions");
const validationAnswers = require("./validators/answers");

const studentController = require("./controllers/students");
const studentImagesController = require("./controllers/studentImages");
const questionController = require("./controllers/questions");
const answersController = require("./controllers/answers");
const feedController = require("./controllers/feed");
const sessionController = require("./controllers/sessions");
const categoriesController = require("./controllers/categories");
const uploadFirebase = require("./services/uploadFirebase");

const routes = express.Router();

//const upload = multer.single("arquivo");

//routes.post("/uploads",  (req, res) => {

// const handleError = (error) => {
// if (error) {
//    res.status(400).send({error: "Arquivo inválido"});
// }

// console.log(req.file);

// res.send(req.file);

// }

//upload(req, res, handleError);

//});

//Rotas públicas
routes.post("/sessions", sessionController.store);

routes.post("/students", validationStudents.create, studentController.store);

routes.use(authMiddleare);

//Rotas de students
routes.get("/students", studentController.index);

routes.delete("/students/:id", studentController.delete);

routes.put("/students/:id", studentController.update);

routes.get("/students/:id", studentController.find);

routes.post("/students/:id/images", uploadSingleImage, uploadFirebase, studentImagesController.store);

//Rotas de questions
routes.post(
  "/questions",
  uploadSingleImage,
  uploadFirebase,
  validationQuestions.create,
  questionController.store
);
routes.delete("/questions/:id", questionController.delete);
routes.put("/questions/:id", questionController.update);

// Rotas de respostas
routes.get("/questions", validationQuestions.index, questionController.index);
routes.post(
  "/questions/:id/answers",
  validationAnswers.create,
  answersController.store
);

//Rotas do feed
routes.get("/feed", feedController.index);

//Rotas de categorias
routes.get("/categories", categoriesController.index);

module.exports = routes;
