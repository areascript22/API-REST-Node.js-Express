const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const userRouter =require('./routes/user_rout');

const PUERTO = process.env.PORT || 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended:true,
}));
app.use(cors());
app.disable('x-powered-by');

app.set('port',PUERTO);

userRouter(app);

app.get('/',(req,res)=>{
    res.send("Servidor con node.js GET POST PUT DELETE 👁‍🗨 ");
 })

server.listen(PUERTO,  ()=>{
    console.log('Nodejs aplication: ' + process.pid + ' Inicial. Puerto:  '+PUERTO);
});

 module.exports = {
    app:app,
    server:server,
 };
 

 