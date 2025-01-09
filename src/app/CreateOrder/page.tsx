'use client';
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation"; 

const CreateOrder = () => {
    const router = useRouter();
    //const params = useParams <{idBurger: string}>()
    const {idBurger} = router.query;
    //console.log(params)

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