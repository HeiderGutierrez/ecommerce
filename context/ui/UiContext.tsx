// Importamos la función createContext del módulo 'react'.
import { createContext } from 'react';

// Definimos una interfaz llamada ContextProps que describe la forma de los datos que se almacenarán en el contexto.
interface ContextProps {
  isMenuOpen: boolean;     // Propiedad que indica si el menú lateral está abierto o cerrado.
  openSideMenu: () => void;     // Función para abrir el menú lateral.
  closeSideMenu: () => void;    // Función para cerrar el menú lateral.
}

// Creamos el contexto llamado UiContext utilizando la función createContext.
// Inicializamos el valor por defecto del contexto con un objeto vacío y lo tipamos con la interfaz ContextProps.
// Esto significa que si no se proporciona un proveedor para el contexto, el valor por defecto será un objeto con las tres propiedades mencionadas (isMenuOpen, openSideMenu y closeSideMenu), pero con valores iniciales indefinidos.
export const UiContext = createContext({} as ContextProps);
