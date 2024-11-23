import bcrypt from 'bcrypt'

const encriptarContrasena = async () => {
    const salRounds = 10;
    const contrasenaTextoPlano = 'Prueba789';

    try {
        const hashedPassword = await bcrypt.hash(contrasenaTextoPlano, salRounds);
        console.log('Contraseña encriptada: ', hashedPassword);     
    }   catch (error) {
        console.error('Error al encriptar la contraseña', error);
    }
};

encriptarContrasena();