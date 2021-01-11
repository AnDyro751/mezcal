import {useState, useEffect} from 'react';
import InputBase from "../../Inputs/base";

export default function NewReview({open = false}) {
    const [isOpen, setIsOpen] = useState(open);
    const [fields, setFields] = useState({
        name: "",
        title: "",
        review: "",
        rating: 0
    });

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const handleSubmit = (e) => {
        e.preventDefault();
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
                <textarea
                    rows={5}
                    placeholder={"Tu reseña..."}
                    className="appearance-none resize-none px-3 uppercase font-medium text-sm py-3 w-full px-3 bg-white text-black font-normal focus:outline-none"></textarea>
            </div>
            <input
                className="text-white bg-black px-8 py-3 rounded focus:outline-none cursor-pointer mt-4"
                type="submit"
                value="Enviar"
            />
        </form>
    )
}