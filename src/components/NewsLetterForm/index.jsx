import {useState} from 'react';
import {SITE_COLORS} from "../../site/info";

export default function NewsLetterForm({}) {
    const [emailValue, setEmailValue] = useState("");

    const handleChange = (e) => {
        setEmailValue(e.target.value || "");
    };

    return (
        <div className="w-full flex space-x-3 items-center">
            {/*<div className="w-full" >*/}
            {/*    <label htmlFor="email_newsletter" className="text-white text-sm italic">Correo Electrónico</label>*/}
            {/*</div>*/}
            <div className="w-9/12">
                <input type="email" id={"email_newsletter"}
                       onChange={handleChange}
                       value={emailValue}
                       className={`w-full bg-white px-3 text-black py-2 rounded focus:outline-white ${SITE_COLORS.border} border`}
                       placeholder="angel@correo.com"/>
            </div>
            <div className="w-3/12">
                <button className="text-white rounded bg-red-600 h-full px-4 w-full cursor-pointer py-2">
                    Enviar
                </button>
            </div>
        </div>
    )
}