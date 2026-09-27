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

  const encryptedPassword = await bcrypt.hash(password, 12);

  const user = await userModel.create({
    name,
    email,
    password: encryptedPassword,
  });

  const { accessToken, refreshToken } = await generateToken({
    userId: user._id,
    role: user.role
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  return res.status(201).json({
    message: "User registered successfully",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    },
    accessToken,
  });
}
