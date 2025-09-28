module.exports = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map(d => ({ message: d.message, path: d.path }))
      });
    }
    req.body = value; 
    next();
  };
};