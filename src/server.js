//importand a biblioteca express
const express = require ('express');
//chamando mongoose, que é uma biblioteca para que possamos usar javascript ao invés da linguagem do banco para fazer o necessário
const mongoose = require ('mongoose');
const path = require ('path');
const cors = require('cors');

//usando a biblioteca em uma variavel
const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

//web socket, para subir arquivos e mostraram em varios dispositvos diferentes in real time
io.on("connection", socket =>{
    socket.on ('connectRoom', box => {
        socket.join(box);
    });
});

//conectando banco de dados mongodb
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-u675i.mongodb.net/omnistack?retryWrites=true', 
{
    useNewUrlParser: true //dizendo para o mongoose que estamos esse formato de conexão
}
);
//usando o socket em todas as URL's
app.use((req, res, next) => { 
    req.io = io;

    return next();
});


//cadastrando modulos da biblioteca express dentro da minha aplicação 
app.use(express.json());//express.json ajuda o servidor entender as requisões que chegam em formato json
app.use(express.urlencoded({extended:true})); //express.urlencoded faz o servidor aceitar arquivos de diversos formatos, já que nossa aplicação vai ser pra subir arquivos
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
//chamando o arquivo rotas, para a nossa aplicação rodar em url definida lá
app.use(require('./routes'));

//setando a porta em que a aplcação vai funcionar
server.listen(process.env.PORT || 3333);
