'use client';
import { useBurger } from '../context/BurgerContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const CartPage = () => {
    const { burgersList, extrasList, removeFromCart, clearCart, removeExtraFromBurger } = useBurger();
    const router = useRouter();
    const [foundExtras, setFoundExtras] = useState({});
    const [notification, setNotification] = useState(null);

    const confirmOrder = async () => {
        try {
            // Transformamos burgersList a la estructura esperada por el backend
            const formattedOrder = {
                totalPrice: burgersList.reduce((acc, burger) => acc + burger.price, 0), // Calculamos el precio total
                burger: burgersList.map(burger => ({
                    idBurger: burger.idBurger,
                    idExtra: burger.extra // Asegúrate de que `extra` es `idExtra`
                }))
            };
    
            const response = await fetch('https://localhost:7271/createOrderRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formattedOrder),
            });
    
            if (!response.ok) {
                throw new Error("Error sending the order");
            }
    
            const data = await response.json();
            setNotification({
                message: `Order Created successfully!\nID ${data.idOrder}.\nTotal to pay: $${data.totalPrice}.\nRemember you pay when you receive your order\nThanks for choosing us`,
                type: "success"
            });

            await new Promise(resolve => setTimeout(resolve, 15000)); //wait 15 seconds seing the notification 
            //hide notification, clear the cart and redirect to home page
            setNotification(null); 
            clearCart();
            router.push('/');
        } catch (err) {
            console.error("Failed to send order:", err);
            setNotification({
                message: "Error creating the order please try again",
                type: "error"
            });
    
            setTimeout(() => setNotification(null), 10000);
        }
    };
    
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
            {/*Button to confirm order and call api backend */}
            <button
                onClick={() => confirmOrder()}
                className="mt-6 px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 block mx-auto"
            >
                Confirm Order
            </button>

            {notification && (
                <div className={`fixed top-5 right-5 px-4 py-3 rounded-lg shadow-lg z-50 text-white 
                    ${notification.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
                    {notification.message}
                </div>
            )}
        </div>
    );
};
export default CartPage;

