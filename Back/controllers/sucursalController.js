const { check, validationResult } = require('express-validator')
const Sucursales = require('../models/Sucursales');
const mongoose = require('mongoose');


//agrega nuevo Sucursal
exports.nuevaSucursal = async (req, res, next) => {
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
    const newSucursal = new Sucursales({ nombre, descripcion });

    try {
        //guardando sucursal
        await newSucursal.save();
        res.json({ mensaje: 'se creó sucursal correctamente'});
    } catch (error) {
        //si hay algun error console log y next
        console.log(error);
        next();
    }
}

//mostrar todas las sucursales
exports.mostrarSucursales = async (req, res, next) =>{
    try {
        const sucursales = await Sucursales.find({});

        res.json(sucursales);
    } catch (error) {
        console.log(error);
        next();
    }
}

//mostrar un sucursal especifico (ID)
exports.mostrarSucursal = async (req, res, next) =>{

    if (!mongoose.Types.ObjectId.isValid(req.params.idSucursal)){
        return res.json({ mensaje: `Esa sucursal no existe.` });
        next();
    };

    const sucursal = await Sucursales.findById(req.params.idSucursal)
            
    //mostrar sucursal
    res.json(sucursal);
}

//actualizar sucursal por params
exports.actualizarSucursal = async (req, res, next) => {
    try {
        const sucursal = await Sucursales.findOneAndUpdate({_id: req.params.idSucursal}, req.body, {
            new: true
        });
        //almacenar registro
        res.json(sucursal);
    } catch (error) {
        //si hay algun error console log y next
        console.log(error);
        next();
    }
}

//eliminar sucursal por (ID)
exports.eliminarSucursal = async (req, res, next) => {
    try {
        await Sucursales.findOneAndDelete({_id: req.params.idSucursal});
        res.json({mensaje : 'La sucursal se eliminó correctamente.'});

    } catch (error) {
        //si hay algun error console log y next
        console.log(error);
        next();
    }
}