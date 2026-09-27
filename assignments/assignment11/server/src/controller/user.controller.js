import userModel from "../models/user.model.js";

export async function register(req, res) {
  const { email, name, password } = req.body;

  const userAlreadyExists = await userModel.findOne({ email });

  if (userAlreadyExists) {
    return res.status(400).json({
      message: "User already exists with this email address",
      errors: [
        {
          field: "email",
          message: "User already exists with this email adddress",
        },
      ],
    });
  }
}
