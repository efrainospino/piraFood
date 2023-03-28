const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db.js')
const routes = require('./routes');

//crear servidor 
const app = express();

(async () => {
    //conexion a la base de datos
    try {
        db.authenticate();
        db.sync();
        console.log('conectado a la base de datos');
    } catch (error) {
        console.log(error)
    }
})();


//habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//rutas de la app 
app.use('/', routes());

//puerto y host
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5001;
//iniciar app
app.listen(port, host, () =>{
    console.log('el servidor esta funcionando');
});


