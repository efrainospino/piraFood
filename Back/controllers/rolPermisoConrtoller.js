const { check, validationResult } = require('express-validator')
const Roles_Permisos = require('../models/Roles_Permisos');
const Sucursales = require('../models/Sucursales');
const Roles = require('../models/Roles');
const Permisos = require('../models/Permisos');
const mongoose = require('mongoose');


//agrega nuevo rolPermiso
exports.nuevoRolPermiso = async (req, res, next) => {
    //validation
    await check('idSucursal').notEmpty().isLength({min:5}).withMessage('La sucursal es invalida').run(req);
    await check('idRol').notEmpty().isLength({min:5}).withMessage('El rol no puede estar vacio').run(req);
    await check('idPermiso').notEmpty().isLength({min:5}).withMessage('El Permiso no puede estar vacio').run(req);
    await check('estado').notEmpty().withMessage('El estado no puede estar vacio').run(req);

    let resultado = validationResult(req);

    //validar los campos del formulario
    if(!resultado.isEmpty()){
        return res.send({
            errores: resultado.array()
        })
    }

    const {idSucursal, idRol, idPermiso, estado} = req.body;

    // verificar que la sucursal exista
    let sucursal = await Sucursales.findById(idSucursal).exec();
    if(!sucursal){
      return res.send({
          errores: { mensaje: 'esa sucursal no existe'},
      })
    }

    // verificar que el rol exista
    let rol = await Roles.findById(idRol).exec();
    if(!rol){
      return res.send({
          errores: { mensaje: 'ese rol no existe'},
      })
    }

    // verificar que el permiso exista
    let permiso = await Permisos.findById(idPermiso).exec();
    if(!permiso){
      return res.send({
          errores: { mensaje: 'ese permiso no existe'},
      })
    }
    
    //almacenar registro
    const newRolPermiso = new Roles_Permisos({ idSucursal: sucursal._id, estado, idRol: rol._id, idPermiso: permiso._id, estado });

    try {
        //guardando rol permiso
        await newRolPermiso.save();
        res.json({ mensaje: 'se creó rol permiso correctamente'});
    } catch (error) {
        //si hay algun error console log y next
        console.log(error);
        next();
    }
}

//mostrar todos los roles permisos
exports.mostrarRolesPermisos = async (req, res, next) =>{
    try {
        const rolesPermisos = await Roles_Permisos.find({});

        res.json(rolesPermisos);
    } catch (error) {
        console.log(error);
        next();
    }
}

//mostrar un rol permiso especifico (ID)
exports.mostrarRolPermiso = async (req, res, next) =>{

  if (!mongoose.Types.ObjectId.isValid(req.params.idRolPermiso)){
      return res.json({ mensaje: `Ese rol permiso no existe.` });
      next();
  };

  const rolPermiso = await Roles_Permisos.findById(req.params.idRolPermiso)
          
  //mostrar rolPermiso
  res.json(rolPermiso);
}

//actualizar rol permiso por params
exports.actualizarRolPermiso = async (req, res, next) => {
    const {idSucursal, estado, idRol, idPermiso} = req.body;

    // verificar que la sucursal exista
    let sucursal = await Sucursales.findById(idSucursal).exec();
    if(!sucursal){
      return res.send({
          errores: { mensaje: 'esa sucursal no existe'},
      })
    }
    // verificar que el rol exista
    let rol = await Roles.findById(idRol).exec();
    if(!rol){
      return res.send({
          errores: { mensaje: 'ese rol no existe'},
      })
    }
    // verificar que el permiso exista
    let permiso = await Permisos.findById(idPermiso).exec();
    if(!permiso){
      return res.send({
          errores: { mensaje: 'ese permiso no existe'},
      })
    }

    try {
        const  rolPermiso = await Roles_Permisos.findOneAndUpdate({_id: req.params.idRolPermiso}, {idSucursa: sucursal._id, estado, idRol: rol._id, idPermiso: permiso._id}, {
            new: true
        });
        //almacenar registro
        res.json(rolPermiso);
    } catch (error) {
        //si hay algun error console log y next
        console.log(error);
        next();
    }
}

//eliminar rolpermiso por (ID)
exports.eliminarRolPermiso = async (req, res, next) => {
    try {
        await Roles_Permisos.findOneAndDelete({_id: req.params.idRolPermiso});
        res.json({mensaje : 'El rol permiso se eliminó correctamente.'});

    } catch (error) {
        //si hay algun error console log y next
        console.log(error);
        next();
    }
}