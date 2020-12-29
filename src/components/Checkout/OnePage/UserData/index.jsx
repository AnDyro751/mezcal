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
                <OnePageStepper text={"1. Información de contacto"} open={true}>
                    <div className="w-full space-y-6">
                        <div className="w-full flex items-start space-x-4">
                            <div className="w-6/12">
                                <InputBase
                                    error={errors ? errors.firstName : null}
                                    id={"order[firstName]"}
                                    name={"firstName"}
                                    label={"Nombre"}
                                    placeholder={"Nombre"}
                                    type={"text"}
                                    onChange={form.handleChange}
                                    value={form.values.firstName}
                                    onBlur={form.handleBlur}
                                />
                            </div>
                            <div className="w-6/12">
                                <InputBase
                                    error={errors ? errors.lastName : null}
                                    id={"order[lastName]"}
                                    name={"lastName"}
                                    label={"Apellido"}
                                    placeholder={"Apellido"}
                                    type={"text"}
                                    onBlur={form.handleBlur}
                                    onChange={form.handleChange}
                                    value={form.values.lastName}
                                />
                            </div>
                        </div>
                        <div className="w-full flex space-x-4">
                            <div className="w-6/12">
                                <InputBase
                                    id={"order[email]"}
                                    name={"email"}
                                    error={errors ? errors.email : null}
                                    label={"Correo Electrónico"}
                                    placeholder={"Correo Electrónico"}
                                    type={"email"}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={form.values.email}/>
                            </div>
                            <div className="w-6/12">
                                <InputBase
                                    error={errors ? errors.phone : null}
                                    id={"order[phone]"}
                                    name={"phone"}
                                    label={"Teléfono"}
                                    placeholder={"Teléfono"}
                                    onBlur={form.handleBlur}

                                    type={"text"}
                                    onChange={form.handleChange}
                                    value={form.values.phone}/>
                            </div>
                        </div>
                    </div>
                </OnePageStepper>
            </div>
        </div>
    )
}