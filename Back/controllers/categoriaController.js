const { check, validationResult } = require('express-validator')
const Categorias = require('../models/Categorias');
const Sucursales = require('../models/Sucursales');
const mongoose = require('mongoose');


//agrega nueva categoria
exports.nuevaCategoria = async (req, res, next) => {
    //validation
    await check('idSucursal').notEmpty().isLength({min:5}).withMessage('La sucursal es invalida').run(req);
    await check('nombre').notEmpty().isLength({min:3}).withMessage('El usuario debe tener minimo 3 caracteres').run(req);
    await check('descripcion').notEmpty().isLength({min:3}).withMessage('El nombre debe tener minimo 3 caracteres').run(req);
    await check('estado').notEmpty().withMessage('El estado no puede estar vacio').run(req);

    let resultado = validationResult(req);

    //validar los campos del formulario
    if(!resultado.isEmpty()){
        return res.send({
            errores: resultado.array()
        })
    }

    const {nombre, descripcion, idSucursal, estado} = req.body;

    // verificar que la sucursal
    let sucursal = await Sucursales.findById(idSucursal).exec();
    if(!sucursal){
      return res.send({
          errores: { mensaje: 'esa sucursal no existe'},
      })
    }
    
    //almacenar registro
    const newCategoria = new Categorias({ nombre, descripcion, idSucursal: sucursal._id, estado });

    try {
        //guardando categoria
        await newCategoria.save();
        res.json({ mensaje: 'se creó categoria correctamente'});
    } catch (error) {
        //si hay algun error console log y next
        console.log(error);
        next();
    }
}

//mostrar todas las categorias
exports.mostrarCategorias = async (req, res, next) =>{
    try {
        const categorias = await Categorias.find({});

        res.json(categorias);
    } catch (error) {
        console.log(error);
        next();
    }
}

//mostrar una categoria especifica (ID)
exports.mostrarCategoria = async (req, res, next) =>{

  if (!mongoose.Types.ObjectId.isValid(req.params.idCategoria)){
      return res.json({ mensaje: `Esa categoria no existe.` });
      next();
  };

  const categoria = await Categorias.findById(req.params.idCategoria)
          
  //mostrar categoria
  res.json(categoria);
}

//actualizar categoria por params
exports.actualizarCategoria = async (req, res, next) => {
    const {nombre, descripcion, idSucursal, estado} = req.body;

    // verificar que la sucursal exista
    let sucursal = await Sucursales.findById(idSucursal).exec();
    if(!sucursal){
      return res.send({
          errores: { mensaje: 'esa sucursal no existe'},
      })
    }

    try {
        const categoria = await Categorias.findOneAndUpdate({_id: req.params.idCategoria}, {nombre, descripcion, idSucursa: sucursal._id, estado}, {
            new: true
        });
        //almacenar registro
        res.json(categoria);
    } catch (error) {
        //si hay algun error console log y next
        console.log(error);
        next();
    }
}

//eliminar categoria por (ID)
exports.eliminarCategoria = async (req, res, next) => {
    try {
        await Categorias.findOneAndDelete({_id: req.params.idCategoria});
        res.json({mensaje : 'La categoria se eliminó correctamente.'});

    } catch (error) {
        //si hay algun error console log y next
        console.log(error);
        next();
    }
}