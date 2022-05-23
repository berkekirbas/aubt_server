const errorMiddleware = (error, request, response, next) => {
  try {
    const status = error.status || 500;
    const message = error.message || "something went wrong";

    response.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};

module.exports = errorMiddleware;
