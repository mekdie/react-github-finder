import { createContext, useReducer } from "react";
import AlertReducer from "./AlertReducer";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const initState = null;

    const [state, dispatch] = useReducer(AlertReducer, initState);

    //set alert
    const setAlert = (msg, type) => {
        dispatch({
            type: "SET_ALERT",
            payload: { msg, type },
        });

        // in 3 seconds remove the alert
        setTimeout(() => dispatch({ type: "REMOVE_ALERT" }), 3000);
    };
    return (
        <AlertContext.Provider value={{ alert: state, setAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

export default AlertContext;
