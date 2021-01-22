const jwt = require("jsonwebtoken");
const auth = require("../config/auth.json");


module.exports = (req, res, next) => {
    //Pegando o campo autorização do cabeçalho da requisição
    const { authorization } = req.headers;

    //Verifica se o campo foi informado, se não, retorna ERRO
    if (!authorization)
        return res.status(401).send({ error: "Token não informado" });

    //Separa o prefixo do token
    const [Bearer, token] = authorization.split(" ");

    //Verifica se o token está presente, se não, retorna ERRO
    if (!token)
        res.status(401).send({ error: "Token mal formatado" });

    console.log(token)

    try {

        //Verifica se o token é válido, se não, cai no catch
        const payload = jwt.verify(token, auth.secret);

        //Coloca o id do aluno na requisição
        req.studentId = payload.studentId;

        //Envia a requisição para frente (controller)
        return next();

    } catch (error) {
        //Retorna o erro de token inválido
        res.status(401).send({ error: "Token inválido" });

    }
}