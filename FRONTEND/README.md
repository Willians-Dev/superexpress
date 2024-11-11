# FUNCIONES DE LA APLICACIÓN

# Páginas

LoginPage: Formulario para poder ingresar o iniciar sesión si se tiene un usuario registrado, los usuarios solo pueden ser agregados por un usuario con rol de administrador

# ESTILOS TAILWIND

# Componentes

LoginInfo.jsx

h-full w-full: Asegura que la imagen ocupe todo el alto y ancho de su contenedor.

rounded-lg: Aplica bordes redondeados al contenedor y a la imagen.

overflow-hidden: Asegura que cualquier parte de la imagen que sobresalga quede oculta dentro de los bordes redondeados.

object-cover: Hace que la imagen mantenga su proporción y ocupe todo el espacio disponible en el contenedor sin distorsionarse.

shadow-lg: Añade una sombra al contenedor de la imagen para darle un efecto visual.


# INFORMACIÓN SOBRE LOS CODIGOS DE BARRAS

# Estándar CODE128

El formato CODE128 es un estándar de código de barras ampliamente utilizado, especialmente en aplicaciones de inventario, logística y sistemas de seguimiento de productos. A diferencia de otros estándares de código de barras como UPC-A, CODE128 es muy versátil y puede codificar tanto números como caracteres alfabéticos, lo que lo hace ideal para situaciones que requieren más flexibilidad en la codificación de datos.

# Caracteristicas del Código de Barras CODE128

Versatilidad en Datos: CODE128 permite la codificación de una combinación de caracteres alfanuméricos, incluyendo letras (A-Z), números (0-9) y símbolos especiales, lo cual es útil en aplicaciones donde se necesita más que solo dígitos numéricos.

Capacidad de Compactación: Este estándar es capaz de codificar datos en un formato compacto, optimizando el espacio en el código de barras, lo que permite una mayor densidad de información en menos espacio físico.

División en Subconjuntos:

    Subset A: Codifica caracteres ASCII de control, dígitos y letras mayúsculas.
    Subset B: Codifica caracteres ASCII de control, dígitos, letras mayúsculas y minúsculas.
    Subset C: Optimiza para pares de números (00-99), permitiendo una densidad máxima para datos numéricos.

Dígito de Verificación (Checksum): CODE128 incluye un dígito de verificación calculado mediante un algoritmo de suma ponderada, lo que garantiza la precisión del código y ayuda a reducir errores de lectura.

Lector de Código de Barras Compatible: Los códigos CODE128 son compatibles con la mayoría de los lectores de códigos de barras modernos y pueden ser utilizados en diversos entornos comerciales e industriales.

# Ejemplos del Código de Barras CODE128

Ejemplo: ABC123456789

# Usos Comunes del Estándar CODE128

Logística y Transporte: Seguimiento de paquetes y envíos.

Inventario y Almacenes: Identificación de productos y gestión de existencias.

Entornos Hospitalarios: Etiquetado de medicamentos, equipos médicos y registros de pacientes.

Sistemas de Tickets: Codificación de entradas de eventos, tickets de embarque, etc.