import React, { createContext } from 'react'

export const InternoContext = createContext();

export const InternoProvider = ({ children }) => {
    const [interno, setInterno] = React.useState();

    return (
        <InternoContext.Provider value={{ interno, setInterno }}>
            {children}
        </InternoContext.Provider>
    )
}