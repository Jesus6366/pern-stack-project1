export const validateCreateTask = (req, res, next) => {
  const { title, description } = req.body;

  // validate title
  if (!title || typeof title !== "string") {
    return res
      .status(400)
      .json({ message: "Title is required and must be a string" });
  }

  // validate description

  if (!description || typeof description !== "string") {
    return res
      .status(400)
      .json({ message: "Description is required and must be a string." });
  }

  next();
};
