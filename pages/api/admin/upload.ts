import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'delotymfu', 
  api_key: '948955528783963', 
  api_secret: 'T8_7LRnvHR3qe6-QScHzC0-FUxc',
});

// Definimos un tipo Data que representa la forma de la respuesta de la API, que contiene un mensaje.
type Data = { message: string };

// Configuramos la API para que no realice un análisis del cuerpo de la solicitud (bodyParser: false).
export const config = {
    api: {
        bodyParser: false
    }
}

// Definimos el controlador 'handler' para la API.
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    // Utilizamos un switch para manejar las diferentes solicitudes HTTP según el método.
    switch (req.method) {
        case 'POST':
            // Si es una solicitud POST, llamamos a la función 'uploadFile' para subir el archivo.
            return uploadFile(req, res);

        default:
            // Si es una solicitud con un método no admitido, devolvemos un mensaje de error.
            return res.status(400).json({ message: 'Bad request' });
    }
}


// Definimos la función 'saveFile' que almacena el archivo en el servidor.
const saveFile = async (file: formidable.File): Promise<string> => {
    const { secure_url } = await cloudinary.uploader.upload(file.filepath);
    return secure_url;
}

// Definimos la función 'parseFiles' que utiliza la librería 'formidable' para analizar y procesar los archivos en la solicitud.
const parseFiles = async (req: NextApiRequest): Promise<string> => {
    return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {

            if (err) {
                return reject(err);
            }

            const filePath = await saveFile(files.file as formidable.File); // Llamamos a la función 'saveFile' para almacenar el archivo.
            resolve(filePath);
        })
    })
}

// Definimos la función 'uploadFile' que utiliza la función 'parseFiles' para subir el archivo y devuelve una respuesta de éxito.
const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const imageURL = await parseFiles(req); // Llamamos a la función 'parseFiles' para procesar los archivos en la solicitud.
    return res.status(200).json({ message: imageURL });
}

