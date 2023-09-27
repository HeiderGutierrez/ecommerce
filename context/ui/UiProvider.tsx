// Importamos el hook useReducer de React y el contexto UiContext y el reducer uiReducer del archivo index del mismo directorio.
import { useReducer } from "react";
import { UiContext, uiReducer } from ".";

// Definimos una interfaz UIState que describe la forma del estado del menú lateral.
export interface UIState {
    isMenuOpen: boolean; // Propiedad que indica si el menú lateral está abierto o cerrado.
}

// Definimos el estado inicial del menú lateral.
const UI_INITIAL_STATE: UIState = {
    isMenuOpen: false,
}

// Definimos el componente UiProvider que actúa como proveedor de contexto.
export const UiProvider = ({children}:{children: React.ReactNode}) => {
    // Utilizamos el hook useReducer para gestionar el estado del menú lateral.
    // El reducer uiReducer se encargará de actualizar el estado en función de las acciones realizadas en los componentes que consumen este contexto.
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    // Definimos dos funciones, openSideMenu y closeSideMenu, que enviarán las acciones al reducer para actualizar el estado del menú lateral.
    const openSideMenu = () => {
        dispatch({type: 'UI - Open Sidebar'}); // Enviamos una acción con type 'UI - Open Sidebar' al reducer.
    }

    const closeSideMenu = () => {
        dispatch({type: 'UI - Close Sidebar'}); // Enviamos una acción con type 'UI - Close Sidebar' al reducer.
    }

    // Devolvemos el proveedor del contexto UiContext, proporcionando el estado actual y las funciones de manipulación del menú lateral (openSideMenu y closeSideMenu) como valores del contexto.
    return (
        <UiContext.Provider value={{
            ...state, // Proporcionamos todas las propiedades del estado actual.
            openSideMenu, // Proporcionamos la función openSideMenu.
            closeSideMenu // Proporcionamos la función closeSideMenu.
        }}>
            {children}
        </UiContext.Provider>
    )
}
