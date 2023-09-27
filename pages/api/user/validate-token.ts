import { db } from "@/database";
import { User } from "@/models";
import { NextApiRequest, NextApiResponse } from "next";
import { jwtToken } from "@/utils";

// Definimos el tipo Data, que puede ser un objeto con el campo "message" o un objeto con los campos "token", "user" que contiene "name" y "role".
type Data =
  | { message: string }
  | { token: string; user: { name: string; role: string } };

// Definimos la función "handler", que maneja las solicitudes HTTP a la API.
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Utilizamos un switch para manejar las diferentes solicitudes HTTP según el método.
  switch (req.method) {
    case "GET":
      // Si es una solicitud GET, llamamos a la función "checkJWT" para verificar el token JWT en la cookie.
      return checkJWT(req, res);

    default:
      // Si es una solicitud con un método no admitido, devolvemos un mensaje de error.
      return res.status(400).json({ message: "Bad request" });
  }
}

// Definimos la función "checkJWT" que verifica el token JWT recibido en la cookie y busca al usuario en la base de datos.
const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // Obtenemos el token de la cookie (si no hay token, se establece como una cadena vacía).
  const { token = "" } = req.cookies;
  let userId = "";

  try {
    // Intentamos verificar el token utilizando la función "isValidToken" de "jwtToken".
    userId = await jwtToken.isValidToken(token);
  } catch (error) {
    // Si el token no es válido o hay algún error en la verificación, devolvemos un mensaje de error con estado 401 (No autorizado).
    res.status(401).json({ message: "El token de autorización no es válido" });
  }

  // Conectamos a la base de datos.
  await db.connect();

  // Buscamos al usuario en la base de datos utilizando el ID extraído del token.
  const user = await User.findById(userId).lean();

  // Desconectamos de la base de datos.
  await db.disconnect();

  // Si no se encuentra al usuario en la base de datos, devolvemos un mensaje de error con estado 400 (Solicitud incorrecta).
  if (!user) {
    return res.status(400).json({ message: "Usuario no existe" });
  }

  // Si se encuentra al usuario en la base de datos, extraemos su ID, email, nombre y rol.
  const { _id, email, name, role } = user;

  // Devolvemos una respuesta con estado 200 (Éxito) y un objeto que contiene el nuevo token generado y los datos del usuario.
  return res.status(200).json({
    token: jwtToken.signToken(_id, email), // Generamos un nuevo token y lo incluimos en la respuesta.
    user: {
      name,
      role,
    },
  });
};
