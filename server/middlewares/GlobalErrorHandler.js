const globalErrorHandler = async (err, req, res, next) => {
  const message = err?.message;
  const stack = err?.stack;
  const statusCode = err?.statusCode ? err?.statusCode : 500;

  res.status(statusCode).json({
    stack,
    message,
  });
};

// invalid route

const invalidRoute = async (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} is invalid`);
  next(err);
};

module.exports = { globalErrorHandler, invalidRoute };
