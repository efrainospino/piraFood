const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const rolesSchema = new Schema({
    nombre: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    }
});


module.exports = mongoose.model('Roles', rolesSchema);