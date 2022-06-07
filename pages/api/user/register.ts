import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { db } from "../../../database";
import { User } from "../../../models";
import { jwt, validations } from "../../../utils";

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      user: {
        email: string;
        name: string;
        role: string;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return registerUser(req, res);
    default:
      res.status(400).json({ message: "Bad request" });
  }
}
const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    email = "",
    password = "",
    name = "",
  } = req.body as { name: string; email: string; password: string };

  if (password.length < 6 && password.length > 14) {
    return res.status(400).json({
      message: "La contraseña debe ser mayor a 6 caracteres y menor de 14",
    });
  }

  if (name.length < 2) {
    return res.status(400).json({ message: "Nombre demasiado corto" });
  }

  if (!validations.isValidEmail(email)) {
    return res.status(400).json({ message: "Correo no es valido" });
  }
  await db.connect();

  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: "Correo ya está registrado" });
  }

  const newUser = new User({
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password),
    name,
    role: "client",
  });

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Revisar logs del server" });
  }

  const { role, _id } = newUser;

  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    token,
    user: {
      name,
      role,
      email,
    },
  });
};
