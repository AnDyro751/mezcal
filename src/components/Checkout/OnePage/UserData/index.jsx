import OnePageStepper from "../Stepper";
import InputBase from "../../../Inputs/base";
import emptyObject from "../../../../lib/emptyObject";

export default function OnePageUserData({handleChangeData, handleBlurData, errors, form}) {

    const handleBlur = (e) => {
        handleBlurData(e.target.name, e.target.value);
        form.handleBlur(e);
    }


    const handleChange = (e) => {
        handleChangeData(e.target.name, e.target.value);
        form.handleChange(e);
    }


    return (
        <div className="w-full">
            <div className="w-full space-y-4">
                <OnePageStepper
                    text={"Información de contacto"}
                    open={true}
                >
                    <div className="w-full divide-y divide-gray-300 border border-gray-300 rounded">
                        <InputBase
                            id={"order[email]"}
                            name={"email"}
                            first
                            // error={!emptyObject(errors)}
                            error={errors ? errors.email : null}
                            // label={"Correo Electrónico"}
                            placeholder={"Correo Electrónico"}
                            type={"email"}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={form.values.email}/>
                        <InputBase
                            // error={!emptyObject(errors)}
                            error={errors ? errors.phone : null}
                            id={"order[phone]"}
                            name={"phone"}
                            // label={"Teléfono"}
                            placeholder={"Teléfono"}
                            onBlur={form.handleBlur}
                            type={"text"}
                            onChange={form.handleChange}
                            last
                            value={form.values.phone}/>
                    </div>
                </OnePageStepper>

            </div>
        </div>
    )
}