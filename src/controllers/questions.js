const Question = require("../models/Question");
const Student = require("../models/Student");

module.exports = {
    index(req, res) {

    },

    async store(req, res) {
        const {title, description, image, gist, categories} = req.body;

        const studentId = req.headers.authorization;

        try {
        //Buscar o student pelo id
        let student = await Student.findByPk(studentId);

        //Se student não existir, retorna ERRO
        if(!student)
            res.status(404).send({error: "Aluno não encontrado"});

        //Crio a question para o student
        let question = await student.createQuestion({ title, description, image, gist});

        await question.addCategories(categories);

        //Retorno sucessos
        res.status(201).send(question);

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

        
    },

    find(req, res) {

    },

    async update(req, res) {
        const questionId = req.params.id;

        const {title, description} = req.body;

        const studentId = req.headers.authorization;

        try{
           const question = await Question.findByPk(questionId);

           if (!question)
            res.status(404).send({error: "Pergunta não encontrada"});

         

          if(question.StudentId != studentId)
            res.status(404).send({ error: "Não autorizado"});

            question.title = title;
            question.description = description;

            question.save();

            res.status(201).send(question);
            
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    },

   async delete(req, res) {
        const questionId = req.params.id;

        const studentId = req.headers.authorization;

        try {

        const question = await Question.findOne({
            where: {
             id: questionId,
             student_id: studentId
            }
        });

        if(!question)
            res.status(404).send({error: "Pergunta não encontrada"});
        

            await question.destroy();

            res.status(204).send();

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

        

    }
}


