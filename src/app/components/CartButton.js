'use client';
import { useBurger } from '../context/BurgerContext';
import { useRouter } from 'next/navigation';

const CartButton = () => {
    const { selectedBurger } = useBurger();
    const router = useRouter();

    return (
        <button
            onClick={() => router.push('/Cart')}
            className="fixed top-4 right-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600"
        >
            🛒 Cart ({selectedBurger.length})
        </button>
    );
};

export default CartButton;
