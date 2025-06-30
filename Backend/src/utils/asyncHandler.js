export const asyncHandler = (fn) => {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      console.error("Error in asyncHandler:", err);
      res.status(err.statusCode || 500).json({
        success: false,
        message: err.message,
      });
    });
  };
};
