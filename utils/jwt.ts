import jwt from 'jsonwebtoken'

// La función signToken toma un _id y un email como parámetros y devuelve un nuevo token JWT firmado.
export const signToken = (_id: string, email: string) => {
    // Comprobamos si existe una variable de entorno llamada JWT_SECRET_SEED.
    if (!process.env.JWT_SECRET_SEED) {
      // Si no existe la variable de entorno, lanzamos un error indicando que no hay semilla de JWT configurada.
      throw new Error('No hay semilla de JWT - revisar las variables de entorno');
    }
  
    // Utilizamos la función jwt.sign para firmar un nuevo token JWT.
    // Se pasa un objeto con los datos a incluir en el token (en este caso, _id y email).
    // También se pasa la semilla secreta obtenida de la variable de entorno y algunas opciones.
    return jwt.sign(
      {
        _id,
        email,
      },
      process.env.JWT_SECRET_SEED, // Semilla secreta para firmar el token.
      {
        expiresIn: '10d', // El token expirará después de 10 días.
        algorithm: 'HS256', // Se utiliza el algoritmo de firma HS256 (HMAC-SHA256).
      }
    );
  };
  

// La función isValidToken toma un token JWT como parámetro y devuelve una promesa que resuelve con el _id del token si es válido.
export const isValidToken = (token: string): Promise<string> => {
    // Comprobamos si existe una variable de entorno llamada JWT_SECRET_SEED.
    if (!process.env.JWT_SECRET_SEED) {
      // Si no existe la variable de entorno, lanzamos un error indicando que no hay semilla de JWT configurada.
      throw new Error('No hay semilla de JWT - revisar las variables de entorno');
    }

    if(token.length <= 10) {
      return Promise.reject('JWT invalido')
    }
  
    // Devolvemos una nueva promesa para realizar la verificación del token.
    return new Promise((resolve, reject) => {
      try {
        // Intentamos verificar el token usando la función jwt.verify.
        // Se pasa el token, la semilla secreta obtenida de la variable de entorno y una función de devolución de llamada.
        jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
          if (err) {
            // Si hay un error en la verificación (por ejemplo, el token es inválido o ha expirado),
            // llamamos a la función reject con el mensaje "JWT no es válido".
            return reject('JWT no es válido');
          }
  
          // Si la verificación es exitosa, extraemos el _id del payload del token.
          // Se asume que el token contiene un campo _id.
          const { _id } = payload as { _id: string };
  
          // Resolvemos la promesa con el _id extraído, indicando que el token es válido.
          resolve(_id);
        });
      } catch (error) {
        // Si ocurre algún error inesperado durante el proceso de verificación del token,
        // lo capturamos en el bloque catch y llamamos a la función reject con el mensaje "JWT no es válido".
        reject('JWT no es válido');
      }
    });
  };
  