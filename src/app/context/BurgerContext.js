'use client';

import { createContext, useContext, useState } from "react";

//creating the context
const BurgerContext = createContext();

export const BurgerProvider = ({ children }) => {
    const [burgersList, setBurgersList] = useState([]); //Intital state of the empty cart
    const [selectedBurger, setSelectedBurger] = useState(null); // the selected burger to add to the cart
    
    const [extrasList, setExtrasList] = useState([]);

    //setting the current burger
    const currentBurger = (burger) => {
        setSelectedBurger(burger);
        
    };


    //add to cart (to the list of burgers)
    const selectBurger = (burger) => {
        setBurgersList(prevCart => [...prevCart, {...burger, extra:null}]);// function to add a burger and extra (set as null) to the cart
        console.log("pasa hamburguesa"  + burger.idBurger);
    };



    //Adding an extra (reeplacing in case there's an extra)
    const addExtraToBurger = (idBurger, extra) =>{
        setBurgersList(prevCart => {
            // find last idburger
            const lastIndex = prevCart.map(item => item.idBurger).lastIndexOf(idBurger);
    
            return prevCart.map((item, index) =>
                index === lastIndex
                    ? { ...item, extra: extra.idExtra } // replace extra only in last burger
                    : item
            );
        });
        console.log(`Extra ${extra.idExtra} agregado a la hamburguesa ${idBurger}`);
    }; 


    //delete the extra without removing the burger from the cart
    const removeExtraFromBurger = (idBurger) => {
        setBurgersList(prevCart => prevCart.map(item =>
            item.idBurger == idBurger
            ? {...item, extra: null} //deleting the extra
            : item
        ));
    }; //how to use this: <button onClick={() => removeExtraFromBurger(burger.idBurger)}>Remove Extra</button>


    const removeFromCart = (idBurger) => {
        setBurgersList(prevCart => prevCart.filter(item => item.idBurger !== idBurger));
    }; //function to delete a burger 

    const clearCart = () => {
        setBurgersList([]);
    };
    
    

    return (
        <BurgerContext.Provider value = {{ selectedBurger: selectedBurger, burgersList: burgersList, extrasList:extrasList, currentBurger, selectBurger, addExtraToBurger, removeExtraFromBurger, removeFromCart, clearCart, setExtrasList }}>
            {children}
        </BurgerContext.Provider>
    );
};


export const useBurger = () => {
    return useContext(BurgerContext);
}