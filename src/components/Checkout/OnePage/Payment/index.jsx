import OnePageStepper from "../Stepper";
import {useContext, useState} from "react";
import ButtonsPrimary from "../../../Buttons/primary";
import {useMutation} from "@apollo/client";
import ADD_PAYMENT_TO_ORDER from "../../../../graphql/mutations/cart/addPaymentToOrder";
import {useToasts} from "react-toast-notifications";
import {OrderContext} from "../../../../stores/userOrder";
import StripeForm from "../../StripeForm";

export default function CheckoutOnePagePayment({currentOrder}) {
    const [currentPayment, setCurrentPayment] = useState(null);
    const {addToast} = useToasts();
    const {state, dispatch} = useContext(OrderContext);


    const [addNewPayment, {data, loading, error}] = useMutation(ADD_PAYMENT_TO_ORDER, {
        onCompleted: (newData) => {
            if (newData.addPaymentToCheckout.errors.length > 0) {
                addToast(newData.addPaymentToCheckout.errors[0].message, {
                    appearance: 'error',
                });
            } else {
                dispatch({type: "UPDATE_ORDER", payload: {...state.order, ...newData.addPaymentToCheckout.order}});
                addToast('Método de pago seleccionado', {
                    appearance: 'success',
                });
            }
        },
        onError: (e) => {
            addToast(e.message ? e.message : e, {
                appearance: 'error',
            });
        },
        variables: {
            "input": {
                "paymentMethodId": currentPayment,
                "source": {"gateway_customer_profile_id": "siop"}
            }
        }
    });

    const handleSelect = (id) => {
        setCurrentPayment(id);
    };


    const createPayment = () => {
        // console.log("CREAR ")
        if (currentPayment) {
            addNewPayment();
        }
    }


    return (
        <div className="w-full">
            <OnePageStepper
                text={"4. Pago"} open={false}>
                <div className="w-full space-y-4">
                    {currentOrder.availablePaymentMethods.nodes.map((paymentMethod, i) => (
                        <div key={i} className="w-full">
                            {
                                paymentMethod.partialName === "stripe" &&
                                <CardGateway
                                    onSelect={handleSelect}
                                    selected={currentPayment ? currentPayment.id === paymentMethod.id : false}
                                    paymentMethod={paymentMethod}/>
                            }
                        </div>
                    ))}
                </div>
                <div className="w-full mt-4">
                    {
                        currentPayment &&
                        currentPayment.partialName !== "stripe" &&
                        <ButtonsPrimary
                            disabled={loading || !currentPayment}
                            loading={loading}
                            text={"Siguiente"}
                            onClick={createPayment}/>
                    }
                </div>
            </OnePageStepper>
        </div>
    )
}


const CardGateway = ({paymentMethod, selected, onSelect}) => {
    // [["month", "4"], ["year", "2032"], ["cc_type", "visa"], ["last_digits", "4242"], ["gateway_payment_profile_id", "pm_1I5K6YBOcPJ0nbHcG0PAau0t"]

    return (
        <>
            <div
                onClick={() => {
                    onSelect(paymentMethod)
                }}
                className="w-full flex space-x-4 cursor-pointer hover:border-black items-center border px-3 py-3 rounded border-gray-300">
                <div className="w-4">
                    <input type="radio"
                           checked={selected}
                           onChange={(e) => {
                               onSelect(paymentMethod);
                           }}
                    />
                </div>
                <div className="w-11/12 flex justify-between items-center">
                    <div className="w-auto">
                        {paymentMethod.name}
                    </div>
                    <div className="w-auto">
                        <img alt="svgImg"
                             className="w-6"
                             src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCA0OCA0OCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48bGluZWFyR3JhZGllbnQgaWQ9InYzVFllY051R2E5Z09UNElSOUdCUWFfakxqRnRmTjFDb3hzX2dyMSIgeDE9IjE5LjI0OSIgeDI9IjMwLjg3OCIgeTE9IjEzLjY0NSIgeTI9IjQxLjgxNyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2Y0NGY1YSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iLjQ0MyIgc3RvcC1jb2xvcj0iI2VlM2Q0YSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2U1MjAzMCI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PHBhdGggZmlsbD0idXJsKCN2M1RZZWNOdUdhOWdPVDRJUjlHQlFhX2pMakZ0Zk4xQ294c19ncjEpIiBkPSJNNDIsNDJIMTBjLTEuMTA1LDAtMi0wLjg5NS0yLTJWMjBjMC0xLjEwNSwwLjg5NS0yLDItMmgzMmMxLjEwNSwwLDIsMC44OTUsMiwydjIwCUM0NCw0MS4xMDUsNDMuMTA1LDQyLDQyLDQyeiI+PC9wYXRoPjxsaW5lYXJHcmFkaWVudCBpZD0idjNUWWVjTnVHYTlnT1Q0SVI5R0JRYl9qTGpGdGZOMUNveHNfZ3IyIiB4MT0iNjQuMzkxIiB4Mj0iNjYuMzAxIiB5MT0iOTIuODE0IiB5Mj0iOTcuNDQxIiBncmFkaWVudFRyYW5zZm9ybT0icm90YXRlKC05MCAxMSA5MS41KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmNmI3NSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iLjY1MSIgc3RvcC1jb2xvcj0iI2ZmNTk2NSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmNGQ1YiI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PHBhdGggZmlsbD0idXJsKCN2M1RZZWNOdUdhOWdPVDRJUjlHQlFiX2pMakZ0Zk4xQ294c19ncjIpIiBkPSJNMTgsMzdMMTgsMzdjMCwwLjU1Mi0wLjQ0OCwxLTEsMWgtNGMtMC41NTIsMC0xLTAuNDQ4LTEtMWwwLDBjMC0wLjU1MiwwLjQ0OC0xLDEtMWg0CUMxNy41NTIsMzYsMTgsMzYuNDQ4LDE4LDM3eiI+PC9wYXRoPjxsaW5lYXJHcmFkaWVudCBpZD0idjNUWWVjTnVHYTlnT1Q0SVI5R0JRY19qTGpGdGZOMUNveHNfZ3IzIiB4MT0iNjQuMzkxIiB4Mj0iNjYuMzAxIiB5MT0iOTkuODE0IiB5Mj0iMTA0LjQ0MSIgZ3JhZGllbnRUcmFuc2Zvcm09InJvdGF0ZSgtOTAgMTEgOTEuNSkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZjZiNzUiPjwvc3RvcD48c3RvcCBvZmZzZXQ9Ii42NTEiIHN0b3AtY29sb3I9IiNmZjU5NjUiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZjRkNWIiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxwYXRoIGZpbGw9InVybCgjdjNUWWVjTnVHYTlnT1Q0SVI5R0JRY19qTGpGdGZOMUNveHNfZ3IzKSIgZD0iTTI1LDM3TDI1LDM3YzAsMC41NTItMC40NDgsMS0xLDFoLTRjLTAuNTUyLDAtMS0wLjQ0OC0xLTFsMCwwYzAtMC41NTIsMC40NDgtMSwxLTFoNAlDMjQuNTUyLDM2LDI1LDM2LjQ0OCwyNSwzN3oiPjwvcGF0aD48bGluZWFyR3JhZGllbnQgaWQ9InYzVFllY051R2E5Z09UNElSOUdCUWRfakxqRnRmTjFDb3hzX2dyNCIgeDE9IjY0LjM5MSIgeDI9IjY2LjMwMSIgeTE9IjEwNi44MTQiIHkyPSIxMTEuNDQxIiBncmFkaWVudFRyYW5zZm9ybT0icm90YXRlKC05MCAxMSA5MS41KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmNmI3NSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iLjY1MSIgc3RvcC1jb2xvcj0iI2ZmNTk2NSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmNGQ1YiI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PHBhdGggZmlsbD0idXJsKCN2M1RZZWNOdUdhOWdPVDRJUjlHQlFkX2pMakZ0Zk4xQ294c19ncjQpIiBkPSJNMzIsMzdMMzIsMzdjMCwwLjU1Mi0wLjQ0OCwxLTEsMWgtNGMtMC41NTIsMC0xLTAuNDQ4LTEtMWwwLDBjMC0wLjU1MiwwLjQ0OC0xLDEtMWg0CUMzMS41NTIsMzYsMzIsMzYuNDQ4LDMyLDM3eiI+PC9wYXRoPjxsaW5lYXJHcmFkaWVudCBpZD0idjNUWWVjTnVHYTlnT1Q0SVI5R0JRZV9qTGpGdGZOMUNveHNfZ3I1IiB4MT0iNjQuMzkxIiB4Mj0iNjYuMzAxIiB5MT0iMTEzLjgxNCIgeTI9IjExOC40NDEiIGdyYWRpZW50VHJhbnNmb3JtPSJyb3RhdGUoLTkwIDExIDkxLjUpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmY2Yjc1Ij48L3N0b3A+PHN0b3Agb2Zmc2V0PSIuNjUxIiBzdG9wLWNvbG9yPSIjZmY1OTY1Ij48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmY0ZDViIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48cGF0aCBmaWxsPSJ1cmwoI3YzVFllY051R2E5Z09UNElSOUdCUWVfakxqRnRmTjFDb3hzX2dyNSkiIGQ9Ik0zOSwzN0wzOSwzN2MwLDAuNTUyLTAuNDQ4LDEtMSwxaC00Yy0wLjU1MiwwLTEtMC40NDgtMS0xbDAsMGMwLTAuNTUyLDAuNDQ4LTEsMS0xaDQJQzM4LjU1MiwzNiwzOSwzNi40NDgsMzksMzd6Ij48L3BhdGg+PHBhdGggZD0iTTQyLDE4SDh2MTRoMzAuMzE5QzQwLjM1MiwzMiw0MiwzMC4zNTIsNDIsMjguMzE5VjE4eiIgb3BhY2l0eT0iLjA1Ij48L3BhdGg+PHBhdGggZD0iTTQxLDE4SDh2MTNoMzAuMTYxQzM5LjcyOSwzMSw0MSwyOS43MjksNDEsMjguMTYxVjE4eiIgb3BhY2l0eT0iLjA3Ij48L3BhdGg+PGxpbmVhckdyYWRpZW50IGlkPSJ2M1RZZWNOdUdhOWdPVDRJUjlHQlFmX2pMakZ0Zk4xQ294c19ncjYiIHgxPSIxNS4yNDkiIHgyPSIyNi44NzgiIHkxPSIxLjY0NSIgeTI9IjI5LjgxNyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzMyYmRlZiI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFlYTJlNCI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PHBhdGggZmlsbD0idXJsKCN2M1RZZWNOdUdhOWdPVDRJUjlHQlFmX2pMakZ0Zk4xQ294c19ncjYpIiBkPSJNMzgsMzBINmMtMS4xMDUsMC0yLTAuODk1LTItMlY4YzAtMS4xMDUsMC44OTUtMiwyLTJoMzJjMS4xMDUsMCwyLDAuODk1LDIsMnYyMAlDNDAsMjkuMTA1LDM5LjEwNSwzMCwzOCwzMHoiPjwvcGF0aD48bGluZWFyR3JhZGllbnQgaWQ9InYzVFllY051R2E5Z09UNElSOUdCUWdfakxqRnRmTjFDb3hzX2dyNyIgeDE9Ijc2LjM5MSIgeDI9Ijc4LjMwMSIgeTE9Ijg4LjgxNCIgeTI9IjkzLjQ0MSIgZ3JhZGllbnRUcmFuc2Zvcm09InJvdGF0ZSgtOTAgMTEgOTEuNSkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM1YmM4ZWYiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM0MmJlZmMiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxwYXRoIGZpbGw9InVybCgjdjNUWWVjTnVHYTlnT1Q0SVI5R0JRZ19qTGpGdGZOMUNveHNfZ3I3KSIgZD0iTTE0LDI1TDE0LDI1YzAsMC41NTItMC40NDgsMS0xLDFIOWMtMC41NTIsMC0xLTAuNDQ4LTEtMXYwYzAtMC41NTIsMC40NDgtMSwxLTFoNAlDMTMuNTUyLDI0LDE0LDI0LjQ0OCwxNCwyNXoiPjwvcGF0aD48bGluZWFyR3JhZGllbnQgaWQ9InYzVFllY051R2E5Z09UNElSOUdCUWhfakxqRnRmTjFDb3hzX2dyOCIgeDE9Ijc2LjM5MSIgeDI9Ijc4LjMwMSIgeTE9Ijk1LjgxNCIgeTI9IjEwMC40NDEiIGdyYWRpZW50VHJhbnNmb3JtPSJyb3RhdGUoLTkwIDExIDkxLjUpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNWJjOGVmIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNDJiZWZjIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48cGF0aCBmaWxsPSJ1cmwoI3YzVFllY051R2E5Z09UNElSOUdCUWhfakxqRnRmTjFDb3hzX2dyOCkiIGQ9Ik0yMSwyNUwyMSwyNWMwLDAuNTUyLTAuNDQ4LDEtMSwxaC00Yy0wLjU1MiwwLTEtMC40NDgtMS0xdjBjMC0wLjU1MiwwLjQ0OC0xLDEtMWg0CUMyMC41NTIsMjQsMjEsMjQuNDQ4LDIxLDI1eiI+PC9wYXRoPjxsaW5lYXJHcmFkaWVudCBpZD0idjNUWWVjTnVHYTlnT1Q0SVI5R0JRaV9qTGpGdGZOMUNveHNfZ3I5IiB4MT0iNzYuMzkxIiB4Mj0iNzguMzAxIiB5MT0iMTAyLjgxNCIgeTI9IjEwNy40NDEiIGdyYWRpZW50VHJhbnNmb3JtPSJyb3RhdGUoLTkwIDExIDkxLjUpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNWJjOGVmIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNDJiZWZjIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48cGF0aCBmaWxsPSJ1cmwoI3YzVFllY051R2E5Z09UNElSOUdCUWlfakxqRnRmTjFDb3hzX2dyOSkiIGQ9Ik0yOCwyNUwyOCwyNWMwLDAuNTUyLTAuNDQ4LDEtMSwxaC00Yy0wLjU1MiwwLTEtMC40NDgtMS0xdjBjMC0wLjU1MiwwLjQ0OC0xLDEtMWg0CUMyNy41NTIsMjQsMjgsMjQuNDQ4LDI4LDI1eiI+PC9wYXRoPjxsaW5lYXJHcmFkaWVudCBpZD0idjNUWWVjTnVHYTlnT1Q0SVI5R0JRal9qTGpGdGZOMUNveHNfZ3IxMCIgeDE9Ijc2LjM5MSIgeDI9Ijc4LjMwMSIgeTE9IjEwOS44MTQiIHkyPSIxMTQuNDQxIiBncmFkaWVudFRyYW5zZm9ybT0icm90YXRlKC05MCAxMSA5MS41KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzViYzhlZiI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQyYmVmYyI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PHBhdGggZmlsbD0idXJsKCN2M1RZZWNOdUdhOWdPVDRJUjlHQlFqX2pMakZ0Zk4xQ294c19ncjEwKSIgZD0iTTM1LDI1TDM1LDI1YzAsMC41NTItMC40NDgsMS0xLDFoLTRjLTAuNTUyLDAtMS0wLjQ0OC0xLTF2MGMwLTAuNTUyLDAuNDQ4LTEsMS0xaDQJQzM0LjU1MiwyNCwzNSwyNC40NDgsMzUsMjV6Ij48L3BhdGg+PHBhdGggZmlsbD0iI2JiZDJkZSIgZD0iTTMxLjg2OCwxOWg0LjI2M0MzNi42MTEsMTksMzcsMTguNjExLDM3LDE4LjEzMnYtNC4yNjNDMzcsMTMuMzg5LDM2LjYxMSwxMywzNi4xMzIsMTNoLTQuMjYzCUMzMS4zODksMTMsMzEsMTMuMzg5LDMxLDEzLjg2OHY0LjI2M0MzMSwxOC42MTEsMzEuMzg5LDE5LDMxLjg2OCwxOXoiPjwvcGF0aD48L3N2Zz4="/>
                    </div>
                </div>
            </div>
            {
                selected &&
                paymentMethod.partialName === "stripe" &&
                <StripeForm/>
            }
        </>
    )
}
