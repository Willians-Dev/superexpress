export const ButtonsInfo = [
  { name: 'Operaciones', path: '/inicio', allowedRoles: [1, 2] }, // Admin y Usuarios
  { name: 'Productos', path: '/productos', allowedRoles: [1, 2] },
  { name: 'Inventario', path: '/inventario', allowedRoles: [1] }, // Solo admin
  { name: 'Reportes', path: '/reportes', allowedRoles: [1, 2] }, // Admin y Usuarios
  { name: 'Gestión de Usuarios', path: '/usuarios', allowedRoles: [1] }, // Solo admin
  { name: 'Perfil', path: '/perfil' }, // Accesible por todos
];