const bcrypt = require('bcryptjs');
const Usuarios = require("../models/usuarios");

// const usuariosGet = (req, res) => {
//   res.json({
//     msg: 'get API-controlador'
//   });
// };
const usuariosGet = async (req, res) => {
  try {
    // Obtener todos los usuarios de la base de datos
    const usuarios = await Usuarios.find();
    
    res.json({
      msg: 'get API-controlador',
      usuarios
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener usuarios', error: error.message });
  }
};

//Codigo de solicitud putput
 const usuariosPut = (req, res) => {
   const { nombre, Email } = req.body;
   res.json({
     msg: 'put API-controlador',
     nombre,
     Email
   });
 };

//Metodo put mejorado
// const usuariosPut = async (req, res) => {
//   try {
//     //const { id } = req.params; // Suponiendo que recibes el ID del usuario en la URL
//     const { nombre, correo, password, rol } = req.body; // Datos actualizados

//     // Verificar si el usuario existe
//     const usuarioExistente = await Usuarios.findById(id);

//     if (!usuarioExistente) {
//       return res.status(404).json({ msg: 'Usuario no encontrado' });
//     }

//     // Actualizar los campos del usuario
//     usuarioExistente.nombre = nombre;
//     usuarioExistente.correo = correo;
//     usuarioExistente.password = password;
//     usuarioExistente.rol = rol;

//     // Guardar el usuario actualizado en la base de datos
//     await usuarioExistente.save();

//     res.json({ msg: 'Usuario actualizado', usuario: usuarioExistente });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: 'Error al actualizar usuario', error: error.message });
//   }
// };


const usuariosPatch = (req, res) => {
  const { nombre, Email } = req.body;
  res.json({
    msg: 'Patch API-controlador',
    nombre,
    Email
  });
};
const usuariosDelete = async (req, res) => {
  try {
    const { nombre } = req.body; // Suponiendo que recibes el nombre del usuario a eliminar en el cuerpo de la solicitud

    // Buscar y eliminar al usuario por su nombre de la base de datos
    const deletedUser = await Usuarios.findOneAndDelete({ nombre });

    if (!deletedUser) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    res.json({ msg: 'Usuario eliminado', deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar usuario', error: error.message });
  }
};


const usuariosPost = async (req, res) => {
  try {
    const { nombre, correo, password, rol } = req.body;

    // Encriptar la contraseña antes de guardarla en la base de datos
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const usuario = new Usuarios({
      nombre,
      correo,
      password: hashedPassword,
      rol // Incluye el campo 'rol' en la creación del usuario
    });

    await usuario.save();
    res.json({
      msg: 'post API-controlador',
      usuario
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al crear usuario',
      error: error.message
    });
  }
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
  usuariosPost
};
