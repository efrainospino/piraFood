const { check, validationResult } = require('express-validator')
const Productos = require('../models/Productos')
const Categorias = require('../models/Categorias');
const Sucursales = require('../models/Sucursales');
const mongoose = require('mongoose');


//agrega nuevo Producto
exports.nuevoProducto = async (req, res, next) => {
    //validation
    await check('idSucursal').notEmpty().isLength({min:5}).withMessage('La sucursal es invalida').run(req);
    await check('nombre').notEmpty().isLength({min:3}).withMessage('El usuario debe tener minimo 3 caracteres').run(req);
    await check('descripcion').notEmpty().isLength({min:3}).withMessage('El nombre debe tener minimo 3 caracteres').run(req);
    await check('valor').isNumeric().withMessage('El valor no puede estar vacio').run(req);
    await check('estado').notEmpty().withMessage('El estado no puede estar vacio').run(req);
    await check('idCategoria').notEmpty().isLength({min:5}).withMessage('La categoria no puede estar vacio').run(req);

    let resultado = validationResult(req);

    //validar los campos del formulario
    if(!resultado.isEmpty()){
        return res.send({
            errores: resultado.array()
        })
    }

    const {nombre, descripcion, idSucursal, idCategoria, valor, estado} = req.body;

    // verificar que la sucursal exista
    let sucursal = await Sucursales.findById(idSucursal).exec();
    if(!sucursal){
      return res.send({
          errores: { mensaje: 'esa sucursal no existe'},
      })
    }

    // verificar que la categoria exista
    let categoria = await Categorias.findById(idCategoria).exec();
    if(!categoria){
      return res.send({
          errores: { mensaje: 'esa categoria no existe'},
      })
    }
    
    //almacenar registro
    const newProducto = new Productos({ nombre, descripcion, valor, idSucursal: sucursal._id, estado, idCategoria: categoria._id });

    try {
        //guardando producto
        await newProducto.save();
        res.json({ mensaje: 'se creó producto correctamente'});
    } catch (error) {
        //si hay algun error console log y next
        console.log(error);
        next();
    }
}

//mostrar todos los productos
exports.mostrarProductos = async (req, res, next) =>{
    try {
        const productos = await Productos.find({});

        res.json(productos);
    } catch (error) {
        console.log(error);
        next();
    }
}

//mostrar un producto especifico (ID)
exports.mostrarProducto = async (req, res, next) =>{

  if (!mongoose.Types.ObjectId.isValid(req.params.idProducto)){
      return res.json({ mensaje: `Ese producto no existe.` });
      next();
  };

  const producto = await Productos.findById(req.params.idProducto)
          
  //mostrar producto
  res.json(producto);
}

//actualizar producto por params
exports.actualizarProducto = async (req, res, next) => {
    const {nombre, descripcion, idSucursal, estado, valor, idCategoria} = req.body;

    // verificar que la sucursal exista
    let sucursal = await Sucursales.findById(idSucursal).exec();
    if(!sucursal){
      return res.send({
          errores: { mensaje: 'esa sucursal no existe'},
      })
    }
    // verificar que la categoria exista
    let categoria = await Categorias.findById(idCategoria).exec();
    if(!categoria){
      return res.send({
          errores: { mensaje: 'esa categoria no existe'},
      })
    }

    try {
        const producto = await Productos.findOneAndUpdate({_id: req.params.idProducto}, {nombre, descripcion, idSucursa: sucursal._id, estado, valor, idCategoria: categoria._id}, {
            new: true
        });
        //almacenar registro
        res.json(producto);
    } catch (error) {
        //si hay algun error console log y next
        console.log(error);
        next();
    }
}

//eliminar producto por (ID)
exports.eliminarProducto = async (req, res, next) => {
    try {
        await Productos.findOneAndDelete({_id: req.params.idProducto});
        res.json({mensaje : 'El producto se eliminó correctamente.'});

    } catch (error) {
        //si hay algun error console log y next
        console.log(error);
        next();
    }
}