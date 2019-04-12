const express = require ('express');

const routes = express.Router();

const multer = require ('multer');

const multerConfig = require ('./config/multer');


const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');


//.post para criar um novo box
routes.post('/boxes', BoxController.store);
routes.post('/boxes/:id/files', multer(multerConfig).single('file'),FileController.store);

//aplicando os metódos  da biblioteca express na variavel criada acima
//routes.get('/teste', (req, res) =>{
    //.get é o método para definir a "rota"(url) para a aplicação rodar 
//    return res.send ('Hello Rocket');
    //res.send é o metódo para enviar uma resposta ao client side
//})

//exportando o arquivo para importar no arquivo server.js

module.exports = routes;

