'use client';

import { createContext, useContext, useState } from "react";

//creating the context
const BurgerContext = createContext();

export const BurgerProvider = ({ children }) => {
    const [selectedBurger, setSelectedBurger] = useState([]); //Intital state of the empty cart
    
    //add to cart
    const selectBurger = (burger) => {
        setSelectedBurger(prevCart => [...prevCart, {...burger, extra:null}]);// function to add a burger and extra (set as null) to the cart
        console.log("pasa hamburguesa"  + burger.idBurger);
    };

    //Adding an extra (reeplacing in case there's an extra)
    const addExtraToBurger = (burgerId, extra) =>{
        setSelectedBurger(prevCart => prevCart.map(item =>
            item.idBurger == burgerId
            ? {...item, extra } //reeplace the current extra
            : item
        ));
        console.log("pasa extra"  + extra.idExtra);
    }; 


    //delete the extra without removing the burger from the cart
    const removeExtraFromBurger = (burgerId) => {
        setSelectedBurger(prevCart => prevCart.map(item =>
            item.idBurger == burgerId
            ? {...item, extra: null} //deleting the extra
            : item
        ));
    }; //how to use this: <button onClick={() => removeExtraFromBurger(burger.idBurger)}>Remove Extra</button>


    const removeFromCart = (idBurger) => {
        setSelectedBurger(prevCart => prevCart.filter(item => item.idBurger !== idBurger));
    }; //function to delete a burger 

    const clearCart = () => {
        setSelectedBurger([]);
    };
    
    

    return (
        <BurgerContext.Provider value = {{ selectedBurger, selectBurger, addExtraToBurger, removeExtraFromBurger, removeFromCart, clearCart }}>
            {children}
        </BurgerContext.Provider>
    );
};


export const useBurger = () => {
    return useContext(BurgerContext);
}