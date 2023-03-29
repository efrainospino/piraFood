const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productosSchema = new Schema({
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
    valor: {
        type: String,
        require: true,
    },
    estado: {
        type: String,
        require: true
    },
    idCategoria: {
        type: Schema.ObjectId,
        ref: 'Categorias'
    }
});


module.exports = mongoose.model('Productos', productosSchema);