import { body, validationResult } from "express-validator";
import { getDB } from "../config/db.js";

export const validUser = async (req, res, next) => {
  try {
    const db = await getDB();
    const collection = db.collection("users");

    const rules = [
      body("name").notEmpty().withMessage("Name is required!"),
      body("email")
        .isEmail()
        .withMessage("Not a valid email!")
        .custom(async (value) => {
          const user = await collection.findOne({ email: value });
          if (user) {
            throw new Error("Email already in use");
          }
        }),
      body("password")
        .isLength({ min: 5 })
        .withMessage("Password should be at least 5 characters long"),
      body("gender").notEmpty().withMessage("Gender is required!"),
    ];

    // Validate each rule
    await Promise.all(rules.map((rule) => rule.run(req)));

    // Check for validation errors
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    // If there are errors, return 400 with error messages
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
