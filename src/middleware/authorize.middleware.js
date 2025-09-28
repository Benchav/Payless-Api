// src/middleware/authorize.middleware.js
module.exports = function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'No autenticado' });

    const userRole = req.user.role;

    // Super-roles que siempre tienen acceso
    if (userRole === 'managua' || userRole === 'admin') return next();

    // Si no se definieron roles permitidos, denegamos por defecto
    if (!allowedRoles || allowedRoles.length === 0) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }

    // Si el role del usuario coincide con alguno de los permitidos -> ok
    if (allowedRoles.includes(userRole)) return next();

    return res.status(403).json({ message: 'No autorizado para esta operación' });
  };
};