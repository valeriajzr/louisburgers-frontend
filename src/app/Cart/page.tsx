'use client';
import { useBurger } from '../context/BurgerContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const CartPage = () => {
    const { burgersList, extrasList, removeFromCart, clearCart, removeExtraFromBurger } = useBurger();
    const router = useRouter();
    const [foundExtras, setFoundExtras] = useState({});

    // find extra of the specific burger 
    const findExtra = (idExtra) => {
        const extra = extrasList.find(item => item.idExtra === idExtra);
        setFoundExtras(prevState => ({
            ...prevState,
            [idExtra]: extra
        }));
    };

    // call findextra when the list changes
    useEffect(() => {
        burgersList.forEach(burger => {
            if (burger.extra) {
                findExtra(burger.extra); // find extra of each burger 
            }
        });
    }, [burgersList]); 

    return(
        <div className="p-8 bg-red-50 min-h-screen">
            <h1 className="text-4x1 font-bold text-center mb-8">Your Cart</h1>
            {burgersList.length === 0 ? (
                <p className="text-center text-lg">Your cart is empty.</p>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {burgersList.map((burger, index)=>(
                        <div key={index} className="border p-4 rounded-lg bg-white shadow-md">
                            <h2 className="text-xl font-semibold">{burger.burgerName}</h2>
                            <p className="text-green-600">€{burger.price}</p>
                            <p>Meat: {burger.meat}</p>
                            <p>Vegetables: {burger.vegetables}</p>
                            {burger.extras && burger.extras.length > 0 &&
                                <p>Included extras:  {burger.extras}</p>
                            }
                            <p className="text-green-600 text-lg">
                                More extras: {foundExtras[burger.extra] && foundExtras[burger.extra].name ? foundExtras[burger.extra].name : 'None'}
                            </p>
                            {/*Button to delete the burger*/}
                            <button
                                onClick={() => removeFromCart(burger.idBurger)}
                                className="mt-2 ml-2 px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                >
                                    Remove Burger
                            </button>
                            {/*Button to delete the extra extra*/}
                            {burger.idExtra && (
                                <button
                                    onClick={() => removeExtraFromBurger(burger.idBurger)}
                                    className ="mt-2 px-3 py-1 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
                                    >
                                        Remove Extra
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {/*Button to delete everything from the cart*/}
            <button
                onClick={() => clearCart()}
                className="mt-6 px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 block mx-auto"
            >
                Clear Cart
            </button>
            {/*Button to go back to main page*/}
            <button
                onClick={() => router.push('/')}
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 block mx-auto"
            >
                Continue Shopping
            </button>
        </div>
    );
};
export default CartPage;

