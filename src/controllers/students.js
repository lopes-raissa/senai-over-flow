const Student = require("../models/Student");
const {Op} = require("sequelize");

module.exports = {
    //Função que vai ser executada pela rota
async index (req, res) {
 
    try{
        const students = await  Student.findAll();

        res.send(students);

    } catch (error) {
        console.log(students);
        res.status(500).send({error})

    }
        
    
},

 async find (req, res) {
    //Recuperar o id do aluno
    const studentId = req.params.id;
 
    try {
    let student = await Student.findByPk(studentId, {
        attributes: ["id", "ra", "name", "email"]

    });

    //Se aluno não encontrado, retornar NOT FOUND
    if (!student)
        return res.status(404).send({ error: "Student não encontrado"});


    res.send(student);

    } catch (error) {
        console.log(error);
        res.status(500).send({error});
    }
    
    
},

async store (req, res)  {
    //Receber os dados do body
    const {ra, name, email, password} = req.body;
    
    try {
        let student = await Student.findOne({
            where: {
                ra: ra,
            
            }
        })

        if(student)
        return res.status(400).send({error: "Student já cadastrado"});

        student = await Student.create({ra, name, email, password});

        res.status(201).send({id: student.id});
    } catch (error) {
        console.log(error);
        res.status(500).send({error});
    }
    
},

  

 async delete  (req, res)  {
    //Recuperar o id do aluno
    const studentId = req.params.id

    try {
        let student = await Student.findByPk(studentId);

        if(!student)
            return res.status(404).send({error: "Student não encontrado"});

        await student.destroy();

    //Devolver resposta de sucesso 
    res.status(204).send();

    } catch (error) {
        console.log(error);
        res.status(500).send(error);

    }

   
},

async update  (req, res)  {
  //Recuperar o id do aluno
  const studentId = req.params.id;

  //Recuperar os dados do corpo
    const {name, email} = req.body;

    try {
        let student = await Student.findByPk(studentId);

    if (!student)
    res.status(404).send({error: "Student não encontrado"});

    student.name = name;
    student.email = email;

    student.save();

  //Retornar resposta
  res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
    
}

}