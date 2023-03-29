const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const usuariosSchema = new Schema({
    usuario: {
        type: String,
        require: true
    },
    nombre: {
        type: String,
        require: true
    },
    apellidos: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
        trim: true
    },
    telefono: {
        type: Number,
        require: true
    },
    idSucursal: {
        type: Schema.ObjectId,
        ref: 'Sucursales'
    },
    idRol: {
        type: Schema.ObjectId,
        ref: 'Roles'
    }
});


module.exports = mongoose.model('Usuarios', usuariosSchema);