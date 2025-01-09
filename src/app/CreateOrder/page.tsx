'use client';
import {useEffect, useState} from "react";
import { useSearchParams } from "next/navigation";
import { useBurger } from '../context/BurgerContext';

const CreateOrder = () => {
    const { selectedBurger } = useBurger();
    const [extras, setExtras] = useState([]);
    const [loading, setLoading] = useState([true]);
    const [error, setError] = useState(null);

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
                    </div>
                    )

                 )
                }

        </div>
    );
};

export default CreateOrder;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      