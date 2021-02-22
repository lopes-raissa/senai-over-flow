const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

//Imports dos Models
const Question = require("../models/Question");
const Student = require("../models/Student");
const Category = require("../models/Category");
const Answer = require("../models/Answer");

const connection = new Sequelize(dbConfig.url, dbConfig.config);

//Inicializa os Models
Student.init(connection);
Question.init(connection);
Category.init(connection);
Answer.init(connection);

//Inicializa os relacionamentos 
Student.associate(connection.models);
Question.associate(connection.models);
Category.associate(connection.models);
Answer.associate(connection.models);