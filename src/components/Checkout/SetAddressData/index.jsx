import InputBase from "../../Inputs/base";
import {useState, useMemo} from 'react';
import ButtonsPrimary from "../../Buttons/primary";
import {useMutation} from "@apollo/client";
import ADD_ADDRESS_TO_CHECKOUT_MUTATION from "../../../graphql/mutations/cart/addAddressToCheckout";

export default function SetAddressData({currentCountry = {}, currentOrder = {}}) {
    const [fields, setFields] = useState({
        name: "",
        lastName: "",
        address: "",
        address2: "",
        cp: "",
        city: "",
        phone: ""
    })

    useMemo(() => {
        if (currentOrder.billingAddress) {
            const billingAddress = currentOrder.billingAddress;
            console.log("SI HAY", currentOrder)
            setFields({
                name: billingAddress.firstname || "",
                lastName: billingAddress.lastname || "",
                address: billingAddress.address1 || "",
                address2: billingAddress.address2 || "",
                cp: billingAddress.zipcode || "",
                city: billingAddress.city || "",
                phone: billingAddress.phone || ""
            })
        }
    }, [])

    const {name, lastName, address, address2, phone, cp, city} = fields;
    const [addAddress, {data, loading, error}] = useMutation(ADD_ADDRESS_TO_CHECKOUT_MUTATION, {
        variables: {
            "input": {
                "billingAddress": {
                    "address1": address,
                    "address2": address2,
                    "phone": phone,
                    "city": city,
                    "countryId": currentCountry.id,
                    "firstname": name,
                    "lastname": lastName,
                    "zipcode": cp,
                    // "stateId": "1"
                },
                "shippingAddress": {
                    "address1": address,
                    "address2": address2,
                    "phone": phone,
                    "city": city,
                    "countryId": currentCountry.id,
                    "firstname": name,
                    "lastname": lastName,
                    "zipcode": cp,
                    // "stateId": "1"
                }
            }
        }

    });

    const handleChange = (e) => {
        setFields({...fields, [e.target.name]: e.target.value})
    }


    const handleClick = () => {
        addAddress()
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

            <div className="w-full">
                <InputBase
                    onChange={handleChange}
                    name={"phone"}
                    type={"tel"} label={"Teléfono"}
                    id={"order[phone]"} value={fields.phone}
                    placeholder={"Teléfono"}/>
            </div>
            <div className="w-full">
                <ButtonsPrimary onClick={handleClick} text={"Guardar y continuar"}
                                loading={loading}
                />
            </div>

        </div>
    )
}