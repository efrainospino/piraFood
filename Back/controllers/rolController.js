const { check, validationResult } = require('express-validator')
const Roles = require('../models/Roles');
const mongoose = require('mongoose');


//agrega nuevo Rol
exports.nuevoRol = async (req, res, next) => {
    //validation
    await check('nombre').notEmpty().isLength({min:3}).withMessage('El nombre debe tener minimo 3 caracteres').run(req);
    await check('descripcion').notEmpty().isLength({min:3}).withMessage('El nombre debe tener minimo 3 caracteres').run(req);

    let resultado = validationResult(req);

    //validar los campos del formulario
    if(!resultado.isEmpty()){
        return res.send({
            errores: resultado.array()
        })
    }

    const {nombre, descripcion} = req.body;
    
    //almacenar registro
    const newRol = new Roles({ nombre, descripcion });

    try {
        //guardando rol
        await newRol.save();
        res.json({ mensaje: 'se creó rol correctamente'});
    } catch (error) {
        //si hay algun error console log y next
        console.log(error);
        next();
    }
}

//mostrar todos los roles
exports.mostrarRoles = async (req, res, next) =>{
    try {
        const roles = await Roles.find({});

        res.json(roles);
    } catch (error) {
        console.log(error);
        next();
    }
}

//mostrar un rol especifico (ID)
exports.mostrarRol = async (req, res, next) =>{

    if (!mongoose.Types.ObjectId.isValid(req.params.idRol)){
        return res.json({ mensaje: `Ese rol no existe.` });
        next();
    };

    const rol = await Roles.findById(req.params.idRol)
            
    //mostrar rol
    res.json(rol);
}

//actualizar roles con params
exports.actualizarRol = async (req, res, next) => {
    try {
        const rol = await Roles.findOneAndUpdate({_id: req.params.idRol}, req.body, {
            new: true
        });
        //almacenar registro
        res.json(rol);
    } catch (error) {
        //si hay algun error console log y next
        console.log(error);
        next();
    }
}

//eliminar rol con (ID)
exports.eliminarRol = async (req, res, next) => {
    try {
        await Roles.findOneAndDelete({_id: req.params.idRol});
        res.json({mensaje : 'El rol se eliminó correctamente.'});

    } catch (error) {
        //si hay algun error console log y next
        console.log(error);
        next();
    }
}