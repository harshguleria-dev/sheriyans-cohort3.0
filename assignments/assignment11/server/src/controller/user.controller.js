import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/auth.utils.js";

export async function register(req, res) {
  const { email, name, password } = req.body;

  const userAlreadyExists = await userModel.findOne({ email });

  if (userAlreadyExists) {
    return res.status(400).json({
      message: "User already exists with this email address",
      errors: [
        {
          field: "email",
          message: "User already exists with this email address",
        },
      ],
    });
  }

  const encryptedPassword = await bcrypt.hash(password, 12);

  const user = await userModel.create({
    name,
    email,
    passwordHash: encryptedPassword,
  });

  const { accessToken, refreshToken } = generateToken({
    userId: user._id,
    role: user.role,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  await userModel.findByIdAndUpdate(user._id, { refreshToken });

  return res.status(201).json({
    message: "User registered successfully",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      accessToken,
    },
  });
}

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
      errors: [
        {
          field: "email",
          message: "Invalid credentials",
        },
      ],
    });
  }

  const isPasswordValid = bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid credentials",
      errors: [
        {
          field: "password",
          message: "Invalid credentials",
        },
      ],
    });
  }

  const { accessToken, refreshToken } = generateToken({
    userId: user._id,
    role: user.role,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  await userModel.findByIdAndUpdate(user._id, { refreshToken });

  return res.status(200).json({
    message: "User logged in successfully",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      accessToken,
    },
  });
}
