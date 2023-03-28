const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');


module.exports = function(){

    //agrega nuevos usuarios via POST
    router.post('/usuarios', 
    usuarioController.nuevoUsuario
    );

    // //obtener todos los usuarios
    // router.get('/usuarios',
    //     usuarioController.mostrarUsuarios
    // );

    // //obtener usuario en especifico (ID)
    // router.get('/usuarios/:idUsuario',
    //     usuarioController.mostrarUsuario
    // );

    // //actualizar un usuario por (ID)
    // router.put('/usuarios/:idUsuario',
    //     usuarioController.actualizarUsuario
    // );

    // //Eliminar un usuario por (ID)
    // router.delete('/usuarios/:idUsuario', 
    //     usuarioController.eliminarUsuario
    // );

    return router;
}