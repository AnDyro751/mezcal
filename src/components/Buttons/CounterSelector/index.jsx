import {useState, useContext, useEffect} from 'react';
import {useMutation} from "@apollo/client";
import UPDATE_CART_QUANTITY_MUTATION from "../../../graphql/mutations/cart/updateCartQuantity";
import {OrderContext} from "../../../stores/userOrder";
import REMOVE_FROM_CART_MUTATION from "../../../graphql/mutations/cart/removeFromCart";
import {useToasts} from "react-toast-notifications";


export const CounterSelector = ({handleChange, handleUpdateLineItems = null, defaultValue = 1, big = true, handleBlur = null, lineItem = {}}) => {
    const [defaultCounter, setDefaultCounter] = useState(defaultValue);
    const [state, dispatch] = useContext(OrderContext);
    const [currentLineItem, setCurrentLineItem] = useState(lineItem);
    const {addToast} = useToasts()

    useEffect(() => {
        setDefaultCounter(defaultValue);
    }, [defaultValue, lineItem])

    const [updateCartQuantity, {data, error, loading}] = useMutation(UPDATE_CART_QUANTITY_MUTATION, {
        onCompleted: (data) => {
            dispatch({type: "UPDATE_ORDER", payload: {...state.order, ...data.updateCartQuantity.order}});
            addToast('Carrito actualizado', {
                appearance: 'success',
                withlink: "/cart",
                withtext: "Ver carrito"
            })
            handleUpdateLineItems(data.updateCartQuantity.order.lineItems)
            let thisLineItem = data.updateCartQuantity.order.lineItems.nodes.find((el) => el.id === lineItem.id);
            if (thisLineItem) {
                setCurrentLineItem(thisLineItem);
            }
        }
    });

    const [removeFromCart, {data: dataRemove, error: errorRemove, loading: loadingRemove}] = useMutation(REMOVE_FROM_CART_MUTATION, {
        onCompleted: (data) => {
            addToast('Producto eliminado de tu carrito', {
                appearance: 'info',
            })
            dispatch({type: "UPDATE_ORDER", payload: {...state.order, ...data.removeFromCart.order}})
            handleUpdateLineItems(data.removeFromCart.order.lineItems)
            let thisLineItem = data.removeFromCart.order.lineItems.nodes.find((el) => el.id === lineItem.id);
            if (thisLineItem) {
                setCurrentLineItem(thisLineItem);
            }
        }
    });

    const handleAddQuantity = () => {
        console.log("ADD", lineItem.product.name)
        setDefaultCounter(prevState => ((prevState || 0) + 1));
        updateCartQuantity({
            variables: {
                quantity: (defaultCounter || 0) + 1,
                lineItemId: lineItem.id
            }
        })
    }

    const handleDeductQuantity = () => {
        console.log("DEDUDCT", lineItem.product.name)
        if (defaultCounter <= 1) {
            removeFromCart({
                variables: {
                    lineItemId: lineItem.id
                }
            })
            setDefaultCounter(0);
        } else {
            updateCartQuantity({
                variables: {
                    quantity: (defaultCounter || 0) - 1,
                    lineItemId: lineItem.id
                }
            })

            setDefaultCounter(prevState => ((prevState || 0) - 1));
        }
    }

    const handleChangeQuantity = (e) => {
        let newValue = parseInt(e.target.value || 0);
        if (newValue !== currentLineItem.quantity) {
            updateCartQuantity({
                variables: {
                    quantity: newValue,
                    lineItemId: lineItem.id
                }
            })
        }
        if (handleBlur) {
            handleBlur(e);
        }
    }

    if (big) {
        return (
            <div className="w-full flex items-center mb-6">
                <div className="w-4/12">
                    <label htmlFor="add_to_cart[select_quantity]">Cantidad</label>
                </div>
                <select
                    id="add_to_cart[select_quantity]"
                    onChange={handleChange}
                    defaultValue={defaultValue}
                    className="w-8/12 focus:ring-indigo-500 focus:border-indigo-500 h-full py-3 pl-4 font-medium text-black pr-6 border-transparent bg-gray-100 pr-6 select appearance-none rounded-md">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
        )
    } else {
        return (
            <div className="w-full bg-gray-100 flex items-center">
                <div
                    onClick={() => {
                        handleDeductQuantity()

                    }}
                    className="w-3/12 py-3 flex justify-center font-medium text-gray-700 text-lg cursor-pointer">
                    {
                        defaultCounter <= 1 ?
                            <img alt="svgImg"
                                 className="h-4 w-4"
                                 src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAyNCAyNCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48cGF0aCBkPSJNIDEwLjMxMjUgLTAuMDMxMjUgQyA4LjU4OTg0NCAtMC4wMzEyNSA3LjE2NDA2MyAxLjMxNjQwNiA3IDMgTCAyIDMgTCAyIDUgTCA2Ljk2ODc1IDUgTCA2Ljk2ODc1IDUuMDMxMjUgTCAxNy4wMzEyNSA1LjAzMTI1IEwgMTcuMDMxMjUgNSBMIDIyIDUgTCAyMiAzIEwgMTcgMyBDIDE2Ljg0Mzc1IDEuMzE2NDA2IDE1LjQ4NDM3NSAtMC4wMzEyNSAxMy44MTI1IC0wLjAzMTI1IFogTSAxMC4zMTI1IDIuMDMxMjUgTCAxMy44MTI1IDIuMDMxMjUgQyAxNC4zMjAzMTMgMi4wMzEyNSAxNC42OTUzMTMgMi40Mjk2ODggMTQuODQzNzUgMi45Njg3NSBMIDkuMTU2MjUgMi45Njg3NSBDIDkuMjk2ODc1IDIuNDI5Njg4IDkuNjg3NSAyLjAzMTI1IDEwLjMxMjUgMi4wMzEyNSBaIE0gNCA2IEwgNCAyMi41IEMgNCAyMy4zMDA3ODEgNC42OTkyMTkgMjQgNS41IDI0IEwgMTguNTkzNzUgMjQgQyAxOS4zOTQ1MzEgMjQgMjAuMDkzNzUgMjMuMzAwNzgxIDIwLjA5Mzc1IDIyLjUgTCAyMC4wOTM3NSA2IFogTSA3IDkgTCA4IDkgTCA4IDIyIEwgNyAyMiBaIE0gMTAgOSBMIDExIDkgTCAxMSAyMiBMIDEwIDIyIFogTSAxMyA5IEwgMTQgOSBMIDE0IDIyIEwgMTMgMjIgWiBNIDE2IDkgTCAxNyA5IEwgMTcgMjIgTCAxNiAyMiBaIj48L3BhdGg+PC9zdmc+"/>
                            :
                            <span>-</span>
                    }

                </div>
                <input
                    className="py-3 bg-gray-100 text-center w-full rounded appearance-none w-6/12"
                    type="number"
                    value={defaultCounter}
                    onBlur={(e) => {
                        console.log("BLUR", defaultCounter)
                        handleChangeQuantity(e);
                    }}
                    onChange={(e) => {
                        console.log("CHANGE", defaultCounter)
                        let newValue = parseInt(e.target.value)
                        if (newValue <= 0) {
                            setDefaultCounter(0);
                        } else {
                            setDefaultCounter(newValue || 0);
                            handleChange(e);
                        }
                    }}
                />
                <button
                    onClick={handleAddQuantity}
                    className="w-3/12 py-3 cursor-pointer flex justify-center font-medium text-gray-700 text-lg">
                    +
                </button>
            </div>

        )
    }
}