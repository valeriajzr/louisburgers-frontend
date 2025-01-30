'use client';
import { useBurger } from '../context/BurgerContext';
import { useRouter } from 'next/navigation';

const CartPage = () => {
    const { selectedBurger = [], removeFromCart, clearCart, removeExtraFromBurger } = useBurger();
    const router = useRouter();

    return(
        <div className="p-8 bg-red-50 min-h-screen">
            <h1 className="text-4x1 font-bold text-center mb-8">Your Cart</h1>
            {selectedBurger.length === 0 ? (
                <p className="text-center text-lg">Your cart is empty.</p>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {selectedBurger.map((burger, index)=>(
                        <div key={index} className="border p-4 rounded-lg bg-white shadow-md">
                            <h2 className="text-xl font-semibold">{burger.burgerName}</h2>
                            <p className="text-green-600">€{burger.price}</p>
                            <p>Meat: {burger.meat}</p>
                            <p>Vegetables: {burger.vegetables}</p>
                            {burger.extras && burger.extras.length > 0 &&
                                <p className="text-green-600 text-lg">Included extras:  {burger.extras}</p>
                            }
                            <p>More extras: {burger.extraName ? burger.extraName: 'None'}</p>

                            {/*Button to delete the extra extra*/}
                            {burger.idExtra && (
                                <button
                                    onClick={() => removeExtraFromBurger(burger.idBurger)}
                                    className ="mt-2 px-3 py-1 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
                                    >
                                        Remove Extra
                                </button>
                            )}
                            {/*Button to delete the burger*/}
                            <button
                                onClick={() => removeFromCart(burger.idBurger)}
                                className="mt-2 ml-2 px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                >
                                    Remove Burger
                            </button>
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

