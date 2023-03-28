const { check, validationResult } = require('express-validator')
const Usuario = require('../models/Usuarios.js');


//agrega nuevo Usuario
exports.nuevoUsuario = async (req, res, next) => {
  //validation
  await check('usuario').notEmpty().isLength({min:3}).withMessage('El usuario debe tener minimo 3 caracteres').run(req);
  await check('nombres').notEmpty().isLength({min:3}).withMessage('El nombre debe tener minimo 3 caracteres').run(req);
  await check('apellidos').notEmpty().isLength({min:3}).withMessage('los apellidos deben tener minimo 3 caracteres').run(req);
  await check('').isEmail().withMessage('Ese email no es valido').run(req);
  await check('telefono').isNumeric().isLength({min:5}).withMessage('El telefono debe minimo 5 numeros').run(req);
  await check('idRol').isNumeric().withMessage('Rol Debe tener un valor').run(req);
  await check('idSucursal').isNumeric().withMessage('Sucursal Debe tener un valor').run(req);

  let resultado = validationResult(req);

  //validar los campos del formulario
  if(!resultado.isEmpty()){
    return res.send({
      errores: resultado.array(),
    })
  }

  const {usuario, nombres, apellidos, telefono, idRol, idSucursal, correo} = req.body;

  //verificar que el usuario no este duplicado
  const existeUsuario = await Usuario.findOne({ where: { usuario }});
  const existeCorreo = await Usuario.findOne({ where: { correo }});

  if(!existeUsuario){
    return res.send({
      errores: { mensaje: 'el usuario ya existe'},
      })
  }
  if(!existeCorreo){
    return res.send({
      errores: { mensaje: 'el correo ya existe'},
      })
  }

  const usuarioCreado = await Usuario.create(req.body)
  res.json(usuarioCreado);
}
    
