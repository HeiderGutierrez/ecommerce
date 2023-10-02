import { db } from '@/database';
import { IPaypal } from '@/interfaces';
import { Order } from '@/models';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

// Definimos un tipo Data que representa la forma de la respuesta de la API, que contiene un mensaje.
type Data = { message: string };

// Definimos el controlador 'handler' para la API.
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    // Utilizamos un switch para manejar las diferentes solicitudes HTTP según el método.
    switch (req.method) {
        case 'POST':
            // Si es una solicitud POST, llamamos a la función 'payOrder' para procesar el pago de la orden.
            return payOrder(req, res);

        default:
            // Si es una solicitud con un método no admitido, devolvemos un mensaje de error.
            return res.status(400).json({ message: 'Bad request' });
    }
}

// Definimos la función 'getPaypalBearerToken' que obtiene el token de acceso (bearer token) necesario para realizar peticiones a la API de PayPal.
const getPaypalBearerToken = async (): Promise<string | null> => {
    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

    // Creamos un cuerpo de solicitud con el grant_type necesario para obtener el token.
    const body = new URLSearchParams('grant_type=client_credentials');

    // Codificamos las credenciales de cliente (client_id:client_secret) en base64 para enviarlas en la cabecera de autorización.
    const base64Token = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`, 'utf-8').toString('base64');

    try {
        // Realizamos una solicitud POST a la URL de autenticación de PayPal para obtener el token de acceso.
        const { data } = await axios.post(process.env.PAYPAL_OAUTH_URL || '', body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${base64Token}`,
            },
        });

        // Devolvemos el token de acceso recibido en la respuesta.
        return data.access_token;
    } catch (error) {
        // Si hay un error en la solicitud (por ejemplo, credenciales inválidas), mostramos el error en la consola y devolvemos null.
        if (axios.isAxiosError(error)) {
            console.log("ERROR", error?.response?.data);
        } else {
            console.log(error);
        }
        return null;
    }
}

// Definimos la función 'payOrder' que procesa el pago de una orden utilizando PayPal.
const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const session: any = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({message: 'Debe de estar autenticado para hacer esto'});
    }
    // Obtenemos el token de acceso de PayPal utilizando la función 'getPaypalBearerToken'.
    const paypalBearerToken = await getPaypalBearerToken();

    // Si no se pudo obtener el token de acceso, respondemos con un mensaje de error.
    if (!paypalBearerToken) {
        return res.status(400).json({ message: 'No se pudo obtener el token de acceso' })
    }

    // Obtenemos los datos de la transacción y orden enviados en el cuerpo de la solicitud.
    const { transactionId = '', orderId = '' } = req.body;

    // Realizamos una solicitud GET a la API de PayPal para obtener el estado de la orden utilizando el ID de transacción recibido.
    const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>(`${process.env.PAYPAL_ORDERS_URL}/${transactionId}`, {
        headers: {
            'Authorization': `Bearer ${paypalBearerToken}`
        }
    });

    // Si el estado de la orden no es 'COMPLETED', respondemos con un mensaje de error.
    if (data.status !== 'COMPLETED') {
        return res.status(401).json({ message: 'Orden no reconocida' })
    }

    // Conectamos a la base de datos.
    await db.connect();

    // Buscamos la orden en la base de datos utilizando el ID de orden recibido.
    const dbOrder = await Order.findById(orderId);

    // Si la orden no existe en la base de datos, respondemos con un mensaje de error.
    if (!dbOrder) {
        await db.disconnect();
        return res.status(400).json({ message: 'La orden no existe en la base de datos' });
    }

    // Verificamos que los montos de PayPal y de la orden coincidan.
    if (dbOrder.total !== Number(data.purchase_units[0].amount.value)) {
        await db.disconnect();
        return res.status(400).json({ message: 'Los montos de PayPal y la orden no coinciden' });
    }

    // Actualizamos la orden en la base de datos para marcarla como pagada y asignarle el ID de transacción de PayPal.
    dbOrder.transactionId = transactionId;
    dbOrder.isPaid = true;
    dbOrder.save();

    // Desconectamos de la base de datos.
    await db.disconnect();

    // Respondemos con un mensaje de éxito.
    return res.status(200).json({ message: 'Order pagada' });
}