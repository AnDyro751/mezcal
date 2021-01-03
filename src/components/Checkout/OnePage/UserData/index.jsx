import OnePageStepper from "../Stepper";
import InputBase from "../../../Inputs/base";

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
                    <div className="w-full space-y-6">
                        <InputBase
                            id={"order[email]"}
                            name={"email"}
                            error={errors ? errors.email : null}
                            // label={"Correo Electrónico"}
                            placeholder={"Correo Electrónico"}
                            type={"email"}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={form.values.email}/>
                        <InputBase
                            error={errors ? errors.phone : null}
                            id={"order[phone]"}
                            name={"phone"}
                            // label={"Teléfono"}
                            placeholder={"Teléfono"}
                            onBlur={form.handleBlur}
                            type={"text"}
                            onChange={form.handleChange}
                            value={form.values.phone}/>
                    </div>
                </OnePageStepper>
                <OnePageStepper
                    text={"Dirección de envío"}
                    small={true}
                >
                    <div className="space-y-4">
                        <InputBase
                            error={errors ? errors.firstname : null}
                            id={"order[firstname]"}
                            name={"firstname"}
                            // label={"Nombre"}
                            placeholder={"Nombre"}
                            type={"text"}
                            onChange={form.handleChange}
                            value={form.values.firstname}
                            onBlur={form.handleBlur}
                        />
                        {/*<InputBase*/}
                        {/*    error={errors ? errors.lastname : null}*/}
                        {/*    id={"order[lastname]"}*/}
                        {/*    name={"lastname"}*/}
                        {/*    // label={"Apellido"}*/}
                        {/*    placeholder={"Apellido"}*/}
                        {/*    type={"text"}*/}
                        {/*    onBlur={form.handleBlur}*/}
                        {/*    onChange={form.handleChange}*/}
                        {/*    value={form.values.lastname}*/}
                        {/*/>*/}


                    </div>
                </OnePageStepper>
            </div>
        </div>
    )
}