const { DataTypes } = require('sequelize')
const db = require('../config/db.js')

const Usuario = db.define('usuarios', {
  usuario: {
    type: DataTypes.STRING,
    alowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    alowNull: false,
    unique: true
  },
  nombres: {
    type: DataTypes.STRING,
    alowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING,
    alowNull: false,
  },
  telefono: {
    type: DataTypes.NUMBER,
    alowNull: false,
  },
  idRol: {
    type: DataTypes.NUMBER,
    alowNull: false,
  },
  idSucursal: {
    type: DataTypes.NUMBER,
    alowNull: false,
  },
})

module.exports = Usuario;