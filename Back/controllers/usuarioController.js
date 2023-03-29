const { check, validationResult } = require('express-validator')
const Usuarios = require('../models/Usuarios');
const Sucursales = require('../models/Sucursales');
const Roles = require('../models/Roles');
const mongoose = require('mongoose');


//agrega nuevo Usuario
exports.nuevoUsuario = async (req, res, next) => {
    //validation
    await check('usuario').notEmpty().isLength({min:3}).withMessage('El usuario debe tener minimo 3 caracteres').run(req);
    await check('nombre').notEmpty().isLength({min:3}).withMessage('El nombre debe tener minimo 3 caracteres').run(req);
    await check('apellidos').notEmpty().isLength({min:4}).withMessage('Los apellidos debe tener minimo 4 caracteres').run(req);
    await check('email').isEmail().withMessage('Ese email no es valido').run(req);
    await check('telefono').isNumeric().isLength({min:5}).withMessage('El telefono debe tener minimo 5 digitos').run(req);
    await check('rolId').notEmpty().isLength({min:4}).withMessage('El Rol es invalido').run(req);
    await check('sucursalId').notEmpty().isLength({min:4}).withMessage('El Rol es invalido').run(req);
    
    let resultado = validationResult(req);
    
    //validar los campos del formulario
    if(!resultado.isEmpty()){
        return res.send({
            errores: resultado.array()
        })
    }
    
    const {nombre, email, usuario, telefono, apellidos, rolId, sucursalId} = req.body;
    

    //verificar que el usuario no este duplicado
    const existeUsuario = await Usuarios.findOne({usuario});
    const existeEmail = await Usuarios.findOne({email});

    if(existeEmail){
        return res.send({
            errores: { mensaje: 'el email ya existe'},
        })
    }
    if(existeUsuario){
        return res.send({
            errores: { mensaje: 'el usuario ya existe'},
        })
    }
    console.log(sucursalId)
    console.log(rolId)

    // verificar que la sucursal y el rol existan
    let sucursal = await Sucursales.findById(sucursalId).exec();
    let rol = await Roles.findById(rolId).exec();
    
    //almacenar registro
    const newUsuario = new Usuarios({ usuario, nombre, email, telefono, apellidos, idRol: rol._id, idSucursal : sucursal._id});

    try {
        //guardando usuario
        await newUsuario.save();
        res.json({ mensaje: 'se creó usuario correctamente'});
    } catch (error) {
        //si hay algun error console log y next
        console.log(error);
        next();
    }
}

//mostrar todos los usuarios
exports.mostrarUsuarios = async (req, res, next) =>{
    try {
        const usuarios = await Usuarios.find({});

        res.json(usuarios);
    } catch (error) {
        console.log(error);
        next();
    }
}

//mostrar un usuario especifico (ID)
exports.mostrarUsuario = async (req, res, next) =>{

    if (!mongoose.Types.ObjectId.isValid(req.params.idUsuario)){
        return res.json({ mensaje: `Ese usuario no existe.` });
        next();
    };

    const usuario = await Usuarios.findById(req.params.idUsuario)
            
    //mostrar usuario
    res.json(usuario);
}

//actualizar usuario por (ID)
exports.actualizarUsuario = async (req, res, next) => {

    const {nombre, email, usuario, telefono, apellidos, rolId, sucursalId} = req.body;


    //verificar que el usuario no este duplicado
    const existeUsuario = await Usuarios.findOne({usuario});
    const existeEmail = await Usuarios.findOne({email});
    
    if(existeEmail){
        return res.send({
            errores: { mensaje: 'el email ya existe'},
        })
    }
    if(existeUsuario){
        return res.send({
            errores: { mensaje: 'el usuario ya existe'},
        })
    }

    // verificar que la sucursal y el rol existan
    let sucursal = await Sucursales.findById(sucursalId).exec();
    let rol = await Roles.findById(rolId).exec();

    if(!sucursal){
        return res.send({
            errores: { mensaje: 'esa sucursal no existe'},
        })
    }
    if(!rol){
        return res.send({
            errores: { mensaje: 'ese rol no existe'},
        })
    }


    try {
        const usuario = await Usuarios.findOneAndUpdate({_id: req.params.idUsuario}, { usuario, nombre, email, telefono, apellidos, idRol: rol._id, idSucursal : sucursal._id}, {
            new: true
        });
        //almacenar registro
        res.json(usuario);
    } catch (error) {
        //si hay algun error console log y next
        console.log(error);
        next();
    }
}

//eliminar usuario por (ID)
exports.eliminarUsuario = async (req, res, next) => {
    try {
        await Usuarios.findOneAndDelete({_id: req.params.idUsuario});
        res.json({mensaje : 'El usuario se eliminó correctamente.'});

    } catch (error) {
        //si hay algun error console log y next
        console.log(error);
        next();
    }
}