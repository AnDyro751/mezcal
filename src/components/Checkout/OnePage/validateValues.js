import validator from "email-validator";
import phone from "phone";

const validate = values => {
    const errors = {};
    if (!values.firstname) {
        errors.firstname = 'Campo requerido';
    } else if (values.firstname.length > 70) {
        errors.firstname = 'Ingresa un nombre más pequeño';
    }

    if (!values.email) {
        errors.email = 'Campo requerido';
    } else if (!validator.validate(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.phone) {
        errors.phone = 'Campo requerido';
    } else if (phone(values.phone, 'MEX').length === 0) {
        errors.phone = 'Ingresa un valor correcto';
    }
    if (!values.address1) {
        errors.address1 = 'Campo requerido';
    } else if (values.address1.length > 100) {
        errors.address1 = 'Ingresa una dirección más corta';
    }

    if (values.address2) {
        if (values.address2.length > 100) {
            errors.address2 = "Ingresa un valor más corto";
        }
    }

    if (!values.zipcode) {
        errors.zipcode = "Campo requerido"
    } else if (values.zipcode.length !== 5) {
        errors.zipcode = "Código postal incorrecto";
    }

    if (!values.city) {
        errors.city = "Campo requerido"
    } else if (values.city.length > 50) {
        errors.city = "Ingresa un valor más corto";
    }

    if (!values.stateId) {
        errors.stateId = "Campo requerido"
    }

    return errors;
};

export default validate