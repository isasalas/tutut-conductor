import React, { createContext } from 'react'

export const SesionContext = createContext();

export const SesionProvider = ({ children }) => {
    const [sesion, setSesion] = React.useState();

    return (
        <SesionContext.Provider value={{ sesion, setSesion }}>
            {children}
        </SesionContext.Provider>
    )
}