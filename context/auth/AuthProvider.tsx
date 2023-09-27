// Importamos los hooks useEffect y useReducer de React, el contexto AuthContext y el reducer authReducer del archivo index del mismo directorio.
import { useEffect, useReducer } from "react";
import { AuthContext, authReducer } from "./";
import { IUser } from "@/interfaces";
import { tesloApi } from "@/api";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

// Definimos una interfaz AuthState que describe la forma del estado de autenticación.
export interface AuthState {
  isLoggedIn: boolean; // Propiedad que indica si el usuario está autenticado o no.
  user?: IUser; // Propiedad que contiene los datos del usuario autenticado (puede ser undefined si no hay usuario autenticado).
}

// Definimos el estado inicial de autenticación.
const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

// Definimos el componente AuthProvider que actúa como proveedor de contexto para la autenticación.
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Utilizamos el hook useReducer para gestionar el estado de autenticación.
  // El reducer authReducer se encargará de actualizar el estado en función de las acciones realizadas en los componentes que consumen este contexto.
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const router = useRouter();
  const { data, status } = useSession()

  // Utilizamos el hook useEffect para ejecutar la función checkToken al cargar la aplicación.
  useEffect(() => {
    if(status === 'authenticated'){
      dispatch({type: '[Auth] - Login', payload: data?.user as IUser});
    }
  }, [data?.user, status]);

  // useEffect(() => {
  //   checkToken();
  // }, []);

  // Definimos la función checkToken que valida el token del usuario al cargar la aplicación.
  const checkToken = async () => {

    if (!Cookies.get('token')) return;

    try {
      // Realizamos una solicitud al endpoint "/user/validate-token" del API para validar el token.
      const { data } = await tesloApi.get('/user/validate-token');
      const { token, user } = data;

      // Si la solicitud es exitosa, establecemos el token en una cookie utilizando la librería js-cookie.
      Cookies.set("token", token);

      // Enviamos una acción al reducer con type "[Auth] - Login" y los datos del usuario autenticado (payload: user) para actualizar el estado de autenticación.
      dispatch({ type: "[Auth] - Login", payload: user });
    } catch (error) {
      // Si hay un error en la solicitud (por ejemplo, el token no es válido), removemos el token de la cookie.
      Cookies.remove('token');
    }
  }

  // Definimos la función loginUser que realiza una solicitud de inicio de sesión al API y actualiza el estado de autenticación si la solicitud es exitosa.
  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      // Realizamos una solicitud de inicio de sesión al endpoint "/user/login" del API enviando el email y contraseña proporcionados.
      const { data } = await tesloApi.post("/user/login", { email, password });
      const { token, user } = data;

      // Establecemos el token en una cookie utilizando la librería js-cookie.
      Cookies.set("token", token);

      // Enviamos una acción al reducer con type "[Auth] - Login" y los datos del usuario autenticado (payload: user) para actualizar el estado de autenticación.
      dispatch({ type: "[Auth] - Login", payload: user });

      return true; // Devolvemos true para indicar que el inicio de sesión fue exitoso.
    } catch (error) {
      return false; // Devolvemos false para indicar que el inicio de sesión falló.
    }
  };

  // Definimos la función registerUser que realiza una solicitud de registro de usuario al API y actualiza el estado de autenticación si la solicitud es exitosa.
  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{
    hasError: boolean;
    message: any;
  }> => {
    try {
      // Realizamos una solicitud de registro de usuario al endpoint "/user/register" del API enviando el nombre, email y contraseña proporcionados.
      const { data } = await tesloApi.post("/user/register", { name, email, password });
      const { token, user } = data;

      // Establecemos el token en una cookie utilizando la librería js-cookie.
      Cookies.set("token", token);

      // Enviamos una acción al reducer con type "[Auth] - Login" y los datos del usuario autenticado (payload: user) para actualizar el estado de autenticación.
      dispatch({ type: "[Auth] - Login", payload: user });

      // Devolvemos un objeto con hasError establecido en false y message vacío para indicar que el registro fue exitoso.
      return {
        hasError: false,
        message: ''
      }
    } catch (error) {
      // Si hay un error en la solicitud (por ejemplo, el email ya está en uso), devolvemos un objeto con hasError establecido en true y message con el mensaje de error correspondiente.
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message
        }
      }
      // Si el error no es del tipo AxiosError, devolvemos un objeto con hasError establecido en true y un mensaje genérico de error.
      return {
        hasError: true,
        message: 'No se pudo crear el usuario, intentelo de nuevo'
      }
    }
  };

  const logout = () => {
    Cookies.remove('cart');
    Cookies.remove("firstName");
    Cookies.remove("lastName");
    Cookies.remove("address");
    Cookies.remove("address2");
    Cookies.remove("zip");
    Cookies.remove("city");
    Cookies.remove("country");
    Cookies.remove("phone");

    signOut();
  }

  // Devolvemos el proveedor del contexto AuthContext, proporcionando el estado actual y las funciones de autenticación (loginUser y registerUser) como valores del contexto.
  return (
    <AuthContext.Provider
      value={{
        ...state, // Proporcionamos todas las propiedades del estado actual.
        loginUser, // Proporcionamos la función loginUser.
        registerUser, // Proporcionamos la función registerUser.
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
