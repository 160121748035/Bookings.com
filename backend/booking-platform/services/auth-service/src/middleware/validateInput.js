const { ZodError } = require('zod');

const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body); // Validates and transforms
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Validation Error',
        errors: error.errors.map(e => ({ path: e.path[0], message: e.message }))
      });
    }
    next(error);
  }
};

module.exports = validate;
