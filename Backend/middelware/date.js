// middlewares/addCreationDate.js
module.exports = (req, res, next) => {
  // Format the current date to YYYY-MM-DD
  req.body.created_at = new Date().toISOString().split("T")[0];
  next();
};
