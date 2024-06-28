// Middleware to handle 404 Not Found errors
const notFound = (req, res, next) => {
  // Create a new error with a message indicating the requested URL was not found
  const error = new Error(`Not Found: ${req.originalUrl}`);
  // Set the response status code to 404 (Not Found)
  res.status(404);
  // Pass the error to the next middleware (error handler)
  next(error);
};

// Error handling middleware for APIs
const errorHandler = (err, req, res, next) => {
  // If the response status code is 200 (OK), change it to 500 (Internal Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  // Set the response status code
  res.status(statusCode);
  // Send a JSON response with the error message and stack trace
  res.json({
    message: err?.message,
    stack: err?.stack,
  });
};

// Export the middleware functions
module.exports = { errorHandler, notFound };
