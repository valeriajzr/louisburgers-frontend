'use client';

import { createContext, useContext, useState } from "react";

const BurgerContext = createContext();

export const BurgerProvider = ({ children }) => {
    const [selectedBurger, setSelectedBurger] = useState(null); //this saves the data of the selected burger
    
    const selectBurger = (burger) => {
        setSelectedBurger(burger);// this saves the selected burger
    };

    return (
        <BurgerContext.Provider value = {{ selectedBurger, selectBurger }}>
            {children}
        </BurgerContext.Provider>
    );
};

//Hook to use the context
export const useBurger = () => {
    return useContext(BurgerContext);
}