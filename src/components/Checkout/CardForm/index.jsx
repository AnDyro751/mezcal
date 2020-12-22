import InputBase from "../../Inputs/base";
import InputBaseSelect from "../../Inputs/Select";
import ButtonsPrimary from "../../Buttons/primary";

export default function CardForm({}) {
    return (
        <div className="w-full space-y-6">
            <h4 className="text-lg my-6 font-medium">
                Agregar tarjeta
            </h4>
            <div className="w-full">
                <InputBase
                    onChange={() => {
                    }}
                    name={"order[credit_card]"}
                    label={"Número de tarjeta"}
                    type={"text"}
                    id={"order[credit_card]"}
                    placeholder={"xxxx xxxx xxxx xxxx"}
                />
            </div>
            <div className="w-full flex space-x-4">
                <div className="w-6/12">
                    <InputBaseSelect
                        label={"Mes"}
                        name={"order[month]"}
                        options={[
                            {id: "01", name: "01"},
                            {id: "02", name: "02"},
                            {id: "03", name: "03"},
                            {id: "04", name: "04"},
                            {id: "05", name: "05"},
                            {id: "06", name: "06"},
                            {id: "07", name: "07"},
                            {id: "08", name: "08"},
                            {id: "09", name: "09"},
                            {id: "10", name: "10"},
                            {id: "11", name: "11"},
                            {id: "12", name: "12"},
                        ]}
                        id={"order[month]"}
                    />
                </div>
                <div className="w-6/12">
                    <InputBaseSelect
                        label={"Año"}
                        name={"order[year]"}
                        options={[
                            {id: "2020", name: "2020"},
                            {id: "2021", name: "2021"},
                            {id: "2022", name: "2022"},
                            {id: "2023", name: "2023"},
                            {id: "2024", name: "2024"},
                            {id: "2025", name: "2025"},
                            {id: "2026", name: "2026"},
                            {id: "2027", name: "2027"},
                            {id: "2028", name: "2028"},
                            {id: "2029", name: "2029"},
                            {id: "2030", name: "2030"},
                            {id: "2031", name: "2031"},
                        ]}
                        id={"order[year]"}
                    />
                </div>
            </div>
            <div className="w-full">
                <InputBase
                    onChange={() => {
                    }}
                    name={"order[cvv]"}
                    label={"Número de seguridad(CVV)"}
                    type={"text"}
                    id={"order[cvv]"}
                    placeholder={"xxx"}
                />
            </div>
            <div className="w-full">
                <ButtonsPrimary text={"Completar order"}/>
            </div>
        </div>
    )
}