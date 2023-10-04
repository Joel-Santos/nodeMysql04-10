const database = require('../databases/connection') // importanto o arquivo de conexão
const express = require('express')
const router = express.Router()
const path = require('path')
const bodyParser = require('body-parser')
router.use(bodyParser.json())
const override = require('method-override')
router.use(bodyParser.urlencoded({extended:true}))
require('dotenv').config();
const jwt = require('jsonwebtoken');
router.use(override('_method'))


const AlunoController = require('../crontrollers/AlunoController') // importando o controler de aluno.

router.get('/novoAluno', (req, res) => {
    res.render(path.join(__dirname, '../views/cadastro.ejs'))
})

router.post('/novoAluno', verifyJWT, AlunoController.novoAluno )

router.get('/listarAlunos', AlunoController.listarAluno)

router.get('/buscarAluno/:matricula', verifyJWT, AlunoController.buscarAluno)

router.put('/atualizar/aluno/:matricula', AlunoController.atualizarAluno)

router.get('/atualizar/aluno/:matricula', AlunoController.formAluno)

router.get('/deletar/aluno/:matricula', verifyJWT, AlunoController.deletarAluno)

//authentication
router.post('/login', (req, res, next) => {
    //esse teste abaixo deve ser feito no seu banco de dados
    if(req.body.user === 'teste' && req.body.password === '123'){
      //auth ok
      const id = 1; //esse id viria do banco de dados
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      });
      return res.json({ auth: true, token: token });
    }
    
    res.status(500).json({message: 'Login inválido!'});
})

router.post('/logout', function(req, res) {
    res.json({ auth: false, token: null });
})

function verifyJWT(req, res, next){
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
}

function verifyJWT(req, res, next){
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
}



module.exports = router 
