'use client';
import { useSearchParams } from "next/navigation";

const CreateOrder = () => {
    const searchParams = useSearchParams();
    const idBurger = searchParams.get("id");

    return(
        <div className="p-8">
            <h1 className = "text-4x1 font-bold mb-4">Create your order { idBurger }</h1>
        {idBurger ? (
            <p className="text-lg">You selected burger with ID: { idBurger }</p>
        ) : (
            <p className="text-lg">Loading...</p>
        )}
        </div>
    );
};

export default CreateOrder;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      