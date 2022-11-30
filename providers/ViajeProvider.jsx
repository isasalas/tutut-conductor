import React, { createContext } from 'react'

export const ViajeContext = createContext();

export const ViajeProvider = ({ children }) => {
    const [viaje, setViaje] = React.useState();

    return (
        <ViajeContext.Provider value={{ viaje, setViaje }}>
            {children}
        </ViajeContext.Provider>
    )
}