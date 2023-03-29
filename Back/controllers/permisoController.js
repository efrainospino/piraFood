const { check, validationResult } = require('express-validator')
const Permisos = require('../models/Permisos');
const mongoose = require('mongoose');


//agrega nuevo Permiso
exports.nuevoPermiso = async (req, res, next) => {
    //validation
    await check('nombre').notEmpty().isLength({min:3}).withMessage('El usuario debe tener minimo 3 caracteres').run(req);
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
    const newPermiso = new Permisos({ nombre, descripcion });

    try {
        //guardando permiso
        await newPermiso.save();
        res.json({ mensaje: 'se creó permiso correctamente'});
    } catch (error) {
        //si hay algun error console log y next
        console.log(error);
        next();
    }
}

//mostrar todos los permisos
exports.mostrarPermisos = async (req, res, next) =>{
    try {
        const permisos = await Permisos.find({});

        res.json(permisos);
    } catch (error) {
        console.log(error);
        next();
    }
}

//mostrar un permiso especifico (ID)
exports.mostrarPermiso = async (req, res, next) =>{

    if (!mongoose.Types.ObjectId.isValid(req.params.idPermiso)){
        return res.json({ mensaje: `Ese permiso no existe.` });
        next();
    };

    const permiso = await Permisos.findById(req.params.idPermiso)
            
    //mostrar permiso
    res.json(permiso);
}

//actualizar permiso con params
exports.actualizarPermiso = async (req, res, next) => {
    try {
        const permiso = await Permisos.findOneAndUpdate({_id: req.params.idPermiso}, req.body, {
            new: true
        });
        //almacenar registro
        res.json(permiso);
    } catch (error) {
        //si hay algun error console log y next
        console.log(error);
        next();
    }
}

//eliminar permiso con (ID)
exports.eliminarPermiso = async (req, res, next) => {
    try {
        await Permisos.findOneAndDelete({_id: req.params.idPermiso});
        res.json({mensaje : 'El permiso se eliminó correctamente.'});

    } catch (error) {
        //si hay algun error console log y next
        console.log(error);
        next();
    }
}