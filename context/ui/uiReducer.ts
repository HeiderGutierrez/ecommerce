// Importamos la interfaz UIState desde el archivo de mismo directorio.
import { UIState } from ".";

// Definimos un tipo llamado UIActionType que representa los diferentes tipos de acciones que pueden ser enviadas al reducer.
type UIActionType = { type: 'UI - Open Sidebar' } | { type: 'UI - Close Sidebar' };

// Definimos la función uiReducer que recibe el estado actual (UIState) y una acción (UIActionType) y devuelve un nuevo estado (UIState) en función de la acción realizada.
export const uiReducer = (state: UIState, action: UIActionType): UIState => {
    switch (action.type) {
        case 'UI - Open Sidebar':
            // Si la acción es de tipo 'UI - Open Sidebar', devolvemos un nuevo estado con la propiedad isMenuOpen establecida a true para indicar que el menú lateral está abierto.
            return {
                ...state,
                isMenuOpen: true,
            }
        case 'UI - Close Sidebar':
            // Si la acción es de tipo 'UI - Close Sidebar', devolvemos un nuevo estado con la propiedad isMenuOpen establecida a false para indicar que el menú lateral está cerrado.
            return {
                ...state,
                isMenuOpen: false,
            }
    
        default:
            // Si la acción no coincide con ninguna de las acciones definidas en el switch, devolvemos el estado actual sin modificar.
            return state;
    }
}
