'use client';
import {useEffect, useState} from "react";
import { useSearchParams } from "next/navigation";
import { useBurger } from '../context/BurgerContext';

const CreateOrder = () => {
    const { selectedBurger, selectBurger, removeFromCart, clearCart, addExtraToBurger, removeExtraFromBurger } = useBurger();
    const [extras, setExtras] = useState([]);
    const [loading, setLoading] = useState([true]);
    const [error, setError] = useState(null);
    const [ selectedExtra, setSelectedExtra ] = useState(null); 

    const handleExtraChange = (extra) =>{
        setSelectedExtra(extra); 
    };

    useEffect(() => {
        const fetchExtras = async () => {
            try{
                const response = await fetch ('https://localhost:7271/api/Burgers/extras',
                    {method: 'GET',
                        cache: 'default'
                    });
            if (!response.ok){
                throw new Error ("Error getting the extras");
            }
            const data = await response.json();
            console.log(data);
            setExtras(data);
            setLoading(false);
            }catch(err){
                setError(err.message);
                setLoading(false);
            }
        };
        fetchExtras();
    }, []);
    if(loading){
        return<p>Loading...</p>
    }
    if(error){
        return <p>Error: </p>
    }

    return(
        <div className="p-8 bg-red-50 min-h-screen">
            <h1 className = "text-4xl font-bold text-center mb-8">Create your order </h1>
            {selectedBurger ? (
                <div>
                    <p className="text-lg">Burger name: { selectedBurger.burgerName }</p>
                    <p className="text-lg">Price: €{selectedBurger.price}</p>
                    <p className="text-lg">Meat: {selectedBurger.meat}</p>
                    <p className="text-lg">Vegetables: {selectedBurger.vegetables}</p>
                    <p className="text-lg">Extras: {selectedBurger.extras}</p>
                </div>
                
                ) : (
                <p className="text-lg">Loading...</p>
                )
            }
            <br></br>
            <h2 className="text-4x1 font-bold mb-4 ">Add more extras: </h2>
                {extras.map((extra) => (
                    <div
                    key={extra.idExtra}>
                    <h3 className="text-xl font-semibold mb-4">{extra.name}</h3>
                    <p className="text-green-600 text-lg">€{extra.price.toFixed(2)}</p>
                     {/*button to add an extra*/}
                    <button
                        onClick = {() => addExtraToBurger (selectedBurger.idBurger, extra)}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600"
                    > 
                        Add extra
                    </button>
                    </div>
                    )

                 )
                }
               

        </div>
    );
};

export default CreateOrder;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      