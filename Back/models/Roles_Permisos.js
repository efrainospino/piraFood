const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const rolesPermisosSchema = new Schema({
  idSucursal: {
    type: Schema.ObjectId,
    ref: 'Sucursales'
  },
  idRol: {
    type: Schema.ObjectId,
    ref: 'Roles'
  },
  idPermiso: {
    type: Schema.ObjectId,
    ref: 'Permisos'
  },
  estado: {
    type: String,
    require: true,
  }
}, {
  timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' }
});

module.exports = mongoose.model('Roles_Permisos', rolesPermisosSchema);