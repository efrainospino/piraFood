const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');
const sucursalController = require('../controllers/sucursalController');
const rolController = require('../controllers/rolController');
const categoriaController = require('../controllers/categoriaController');
const productoController = require('../controllers/productoController');
const rolPermisoController = require('../controllers/rolPermisoConrtoller');
const permisoController = require('../controllers/permisoController');


module.exports = function(){

    // ------ usuarios router ---->

    //agrega nuevos usuarios via POST
    router.post('/usuarios', 
        usuarioController.nuevoUsuario
    );

    //obtener todos los usuarios
    router.get('/usuarios',
        usuarioController.mostrarUsuarios
    );

    //obtener usuario en especifico (ID)
    router.get('/usuarios/:idUsuario',
        usuarioController.mostrarUsuario
    );

    //actualizar un usuario por (ID)
    router.put('/usuarios/:idUsuario',
        usuarioController.actualizarUsuario
    );

    //Eliminar un usuario por (ID)
    router.delete('/usuarios/:idUsuario', 
        usuarioController.eliminarUsuario
    );

    // ------ sucursal router ---->

    //agrega nuevas sucursales via POST
    router.post('/sucursales', 
        sucursalController.nuevaSucursal
    );

    //obtener todas sucursales
    router.get('/sucursales',
        sucursalController.mostrarSucursales
    );

    //obtener Sucursal en especifico (ID)
    router.get('/sucursales/:idSucursal',
        sucursalController.mostrarSucursal
    );

    //actualizar sucursal por nombre
    router.put('/sucursales/:idSucursal',
        sucursalController.actualizarSucursal
    );

    //Eliminar sucursal por (ID)
    router.delete('/sucursales/:idSucursal', 
        sucursalController.eliminarSucursal
    );

    // ------ rol router ---->

    //agrega nuevo rol via POST
    router.post('/roles', 
        rolController.nuevoRol
    );

    //obtener todos los roles
    router.get('/roles',
        rolController.mostrarRoles
    );

    //obtener rol en especifico (ID)
    router.get('/roles/:idRol',
        rolController.mostrarRol
    );

    //actualizar rol por id
    router.put('/roles/:idRol',
        rolController.actualizarRol
    );

    //Eliminar rol por (ID)
    router.delete('/roles/:idRol', 
        rolController.eliminarRol
    );

    // ------ categoria router ---->

    //agrega nueva categoria via POST
    router.post('/categorias', 
        categoriaController.nuevaCategoria
    );

    //obtener todos las categorias
    router.get('/categorias',
        categoriaController.mostrarCategorias
    );

    //obtener categoria en especifica (ID)
    router.get('/categorias/:idCategoria',
        categoriaController.mostrarCategoria
    );

    //actualizar categoria por id
    router.put('/categorias/:idCategoria',
        categoriaController.actualizarCategoria
    );

    //Eliminar categoria por (ID)
    router.delete('/categorias/:idCategoria', 
        categoriaController.eliminarCategoria
    );

    // ------ productos router ---->

    //agrega nuevo producto via POST
    router.post('/productos', 
        productoController.nuevoProducto
    );

    //obtener todos los productos
    router.get('/productos',
        productoController.mostrarProductos
    );

    //obtener producto en especifico (ID)
    router.get('/productos/:idProducto',
        productoController.mostrarProducto
    );

    //actualizar producto por id
    router.put('/productos/:idProducto',
        productoController.actualizarProducto
    );

    //Eliminar producto por (ID)
    router.delete('/productos/:idProducto', 
        productoController.eliminarProducto
    );

    // ------ permiso router ---->

    //agrega nuevo permiso via POST
    router.post('/permisos', 
        permisoController.nuevoPermiso
    );

    //obtener todos los permisos
    router.get('/permisos',
        permisoController.mostrarPermisos
    );

    //obtener permiso en especifico (ID)
    router.get('/permisos/:idPermiso',
        permisoController.mostrarPermiso
    );

    //actualizar permiso por id
    router.put('/permisos/:idPermiso',
        permisoController.actualizarPermiso
    );

    //Eliminar permiso por (ID)
    router.delete('/permisos/:idPermiso', 
        permisoController.eliminarPermiso
    );

    // ------ rol permiso router ---->

    //agrega nuevo rol permiso via POST
    router.post('/rolespermisos', 
        rolPermisoController.nuevoRolPermiso
    );

    //obtener todos los roles permisos
    router.get('/rolespermisos',
        rolPermisoController.mostrarRolesPermisos
    );

    //obtener rol permiso en especifico (ID)
    router.get('/rolespermisos/:idRolPermiso',
        rolPermisoController.mostrarRolPermiso
    );

    //actualizar rol permiso por id
    router.put('/rolespermisos/:idRolPermiso',
        rolPermisoController.actualizarRolPermiso
    );

    //Eliminar rol permiso por (ID)
    router.delete('/rolespermisos/:idRolPermiso', 
        rolPermisoController.eliminarRolPermiso
    );

    return router;
}