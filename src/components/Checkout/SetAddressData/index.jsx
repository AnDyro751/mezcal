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
    return (
        <div className="w-full space-y-6">
            <div className="w-full flex space-x-4">
                <div className="w-6/12">
                    <InputBase type={"text"} label={"Nombre"} id={"order[name]"} value={fields.name}
                               placeholder={"Nombre"}/>
                </div>
                <div className="w-6/12">
                    <InputBase type={"text"} label={"Apellido"} id={"order[lastName]"} value={fields.lastName}
                               placeholder={"Apellido"}/>
                </div>
            </div>
            <div className="w-full">
                <InputBase type={"text"} label={"Dirección: Calle y Número ( Incluir número interior )"}
                           id={"order[address]"} value={fields.address}
                           placeholder={"Dirección: Calle y Número ( Incluir número interior )"}/>
            </div>
            <div className="w-full">
                <InputBase type={"text"} label={"Colonia"}
                           id={"order[address2]"} value={fields.address2}
                           placeholder={"Colonia"}/>
            </div>

            <div className="w-full flex space-x-4">
                <div className="w-6/12">
                    <InputBase type={"text"} label={"Código postal"} id={"order[cp]"} value={fields.cp}
                               placeholder={"Código postal"}/>
                </div>
                <div className="w-6/12">
                    <InputBase
                        type={"text"}
                        label={"Ciudad"}
                        id={"order[city]"}
                        value={fields.city}
                        placeholder={"Apellido"}
                    />
                </div>
            </div>

        </div>
    )
}