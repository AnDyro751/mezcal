import InputBase from "../../Inputs/base";
import {useState} from 'react';

export default function SetAddressData() {
    const [fields, setFields] = useState({
        name: "",
        lastName: "",
        address: "",
        address2: "",
        cp: "",
        city: ""
    })

    const handleChange = (e) => {
        console.log(e.target)
        setFields({...fields, [e.target.name]: e.target.value})
    }

    return (
        <div className="w-full space-y-6">
            <div className="w-full flex space-x-4">
                <div className="w-6/12">
                    <InputBase
                        name={"name"}
                        onChange={handleChange}
                        type={"text"} label={"Nombre"} id={"order[name]"} value={fields.name}
                        placeholder={"Nombre"}/>
                </div>
                <div className="w-6/12">
                    <InputBase
                        name={"lastName"}
                        onChange={handleChange}
                        type={"text"} label={"Apellido"} id={"order[lastName]"} value={fields.lastName}
                        placeholder={"Apellido"}/>
                </div>
            </div>
            <div className="w-full">
                <InputBase
                    onChange={handleChange}
                    name={"address"}
                    type={"text"} label={"Dirección: Calle y Número ( Incluir número interior )"}
                    id={"order[address]"} value={fields.address}
                    placeholder={"Dirección: Calle y Número ( Incluir número interior )"}/>
            </div>
            <div className="w-full">
                <InputBase
                    onChange={handleChange}
                    name={"address2"}
                    type={"text"} label={"Colonia"}
                    id={"order[address2]"} value={fields.address2}
                    placeholder={"Colonia"}/>
            </div>

            <div className="w-full flex space-x-4">
                <div className="w-6/12">
                    <InputBase
                        name={"cp"}
                        onChange={handleChange}
                        type={"text"} label={"Código postal"} id={"order[cp]"} value={fields.cp}
                        placeholder={"Código postal"}/>
                </div>
                <div className="w-6/12">
                    <InputBase
                        onChange={handleChange}
                        name={"city"}
                        type={"text"}
                        label={"Ciudad"}
                        id={"order[city]"}
                        value={fields.city}
                        placeholder={"Ciudad"}
                    />
                </div>
            </div>

        </div>
    )
}