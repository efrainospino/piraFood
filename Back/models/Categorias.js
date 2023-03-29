const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const categoriasSchema = new Schema({
    idSucursal: {
      type: Schema.ObjectId,
      ref: 'Sucursales'
    },
    nombre: {
      type: String,
      require: true
    },
    descripcion: {
      type: String,
      require: true
    },
    estado: {
      type: String,
      require: true
    }
});


module.exports = mongoose.model('Categorias', categoriasSchema);