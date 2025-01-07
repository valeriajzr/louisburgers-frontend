"use client";
import {useEffect, useState} from "react";
import API_BASE_URL from "./config";

export default function Home(){
  const [burgers, setBurgers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBurgers = async () => {
      try{
        const response = await fetch ('https://localhost:7271/api/Burgers/burger',
          {method: 'GET',
            cache: 'default'
          });
        if (!response.ok){
          throw new Error ("Error al obtener las hamburguesas");
        }
        const data = await response.json();
        console.log(data);
        setBurgers(data);
        setLoading(false);
      } catch (err){
        setError(err.message);
        setLoading(false);
      }
    };
    fetchBurgers();
  }, []);
  if (loading){
    return<p>Loading...</p>;
  }
  if (error){
    return <p>Error: {error}</p>
  }

    return (
      <div className ="p-8">
          <h1 className="text-4xl font-bold text-center mb-8">Menu</h1>
          <div className ="grid grid-cols-1 md:grid-cols-2 lg:grid-cols3 gap-6">
            {burgers.map((burger)=> (
              <div
              key={burger.idBurger}
              className="border border-gray-300 rounded-lg shadow-lg p-6 bg-white text-center">
              
              <h2 className="text-xl font-semibold mb-4">{burger.burgerName}</h2>
              <p className="text-green-600 text-lg">€{burger.price.toFixed(2)}</p>
              <p className="text-green-600 text-lg">Meat:  {burger.meat}</p>
              <p className="text-green-600 text-lg">Vegetables:  {burger.vegetables}</p>
              {burger.extras && burger.extras.length > 0 &&
               <p className="text-green-600 text-lg">Extras:  {burger.extras}</p>
              }
             
              </div>
            ))}
          </div>
      </div>
  );
}
