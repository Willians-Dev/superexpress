import bcrypt from 'bcrypt';

const encriptarContrasena = async () => {
  const saltRounds = 10;
  const contrasenaTextoPlano = 'Prueba789';  // Cambia esto por la contraseña que desees encriptar

  try {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contrasenaTextoPlano, saltRounds);
    console.log('Contraseña encriptada:', hashedPassword);
  } catch (error) {
    console.error('Error al encriptar la contraseña:', error);
  }
};

encriptarContrasena();