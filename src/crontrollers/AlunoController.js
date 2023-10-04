const database = require('../databases/connection') // importando nossa variavel de conexão
const path = require('path')

class AlunoController {

    novoAluno(request, response) {

        const { matricula, nome, turma, email, genero } = request.body
        console.log(matricula, nome, turma, email, genero)

        database.insert({ matricula, nome, turma, email, genero }).table("alunos").then(data => {
            console.log(data)
            response.json({ message: 'Aluno criado com sucesso!' })
        }).catch(error => {
            console.log(error)
        })
    }
    listarAluno(request, response) {
        database.select("*").table("alunos").then(aluno => {
            console.log(aluno)
            response.render(path.join(__dirname, '../views/listar.ejs'), {alunos: aluno})
        }).catch(error => {
            console.log(error)
        })
    }
    buscarAluno(request, response) {
        const id = request.params
        console.log(id)
        database.select("*").table("alunos").where({ matricula: id.matricula }).then(aluno => {
            console.log(aluno)
            response.json(aluno)
        }).catch(error => {
            console.log(error)
        })
    }
    formAluno(request, response){
        const id = request.params
        database.select("*").table("alunos").where({ matricula: id.matricula }).then(aluno => {
            console.log(aluno)
            response.render(path.join(__dirname, '../views/editarAluno.ejs'), {aluno})
        }).catch(error => {
            console.log(error)
        })

    }
    atualizarAluno(request, response) {
        const id = request.params
        console.log(id);
        const {matricula, nome, turma, email, genero } = request.body
        console.log(matricula, nome, turma, email, genero)
        database.where({matricula: id.matricula }).update({ nome, turma, email, genero }).table("alunos").then(data => {
            response.json({ message: "Dados atualizados com Sucesso" }).catch(error => {
                response.json(error)
            })
        })
    }
    deletarAluno(request, response) {
        const id = request.params
        database.where({ matricula: id.matricula }).del().table("alunos").then(data => {
            response.json({ message: "Aluno removido" })
        }).catch(error => {
            response.json(error)
        })
    }
}

module.exports = new AlunoController()