import {useState, useEffect} from 'react';
import InputBase from "../../Inputs/base";
import {useMutation} from "@apollo/client";
import NEW_REVIEW_MUTATION from "../../../graphql/mutations/cart/newReview";

export default function NewReview({open = false}) {
    const [isOpen, setIsOpen] = useState(open);
    const [fields, setFields] = useState({
        name: "",
        title: "",
        review: "",
        rating: 0
    });
    const [addReview, {data, loading, error}] = useMutation(NEW_REVIEW_MUTATION, {
        onCompleted: () => {
            alert("Tu reseña se ha registrado");
        },
        variables: {
            productId: ""
        }
    });

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (fields.name.length > 0 && fields.title.length > 0 && fields.review.length > 0 && fields.rating > 0) {
            alert("Valido");
            // addReview()
        }
    };

    const handleChange = (e) => {
        setFields({...fields, [e.target.name]: e.target.value});
    };

    if (!isOpen) {
        return null
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full px-4 py-6 bg-gray-100 shadow-lg">
            <h3 className="mb-4 text-gray-700 font-medium uppercase">Escribir una reseña</h3>
            <div className="w-full space-y-4">
                <InputBase
                    onChange={handleChange}
                    value={fields.name} name={"name"} placeholder={"Nombre"} label={"Tu nombre"}/>
                <InputBase
                    onChange={handleChange}
                    value={fields.title} name={"title"} placeholder={"Título"} label={"Título"}/>
                <div className="w-full">
                    <label className="mb-2 w-full block text-sm text-gray-500">Tu reseña</label>
                    <textarea
                        rows={5}
                        placeholder={"Tu reseña..."}
                        className="appearance-none relative shadow-input z-0 resize-none px-3 uppercase font-medium text-sm py-3 w-full px-3 bg-white text-black font-normal focus:outline-none"></textarea>
                </div>
            </div>
            <div className="w-full mt-4 flex space-x-4 items-center">
                <div className="w-auto">
                    <input
                        className="text-white bg-black px-8 py-3 rounded focus:outline-none cursor-pointer"
                        type="submit"
                        value="Enviar"
                    />
                </div>
                <div className="w-auto">
                    <span>
                        Cancelar
                    </span>
                </div>
            </div>
        </form>
    )
}