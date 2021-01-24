import {useMutation} from "@apollo/client";
import {ADD_PRODUCT_TO_CART_MUTATION} from "../../../graphql/mutations/products/addProductToCart";
import ButtonsPrimary from "../../Buttons/primary";
import {useState, useContext, useMemo} from 'react';
import emptyObject from "../../../lib/emptyObject";
import {useToasts} from 'react-toast-notifications';
import CounterSelector from "../../Buttons/CounterSelector";
import {OrderContext} from "../../../stores/userOrder";
import ProductProperties from "../properties";
import ProductTaxons from "../Taxons";
import CREATE_ORDER_MUTATION from "../../../graphql/mutations/cart/createOrder";
import setCookie from "../../../lib/setCookie";
import ProductShareButtons from "../../ProductShareButtons";

function createVariantObject(optionTypes, inArray = false) {
    let newObject = {}
    optionTypes.nodes.map((opt) => {
        newObject[opt.name] = inArray ? [] : null
    })
    return newObject
}


function isItemInArray(array, item) {
    let itemArray;
    array.map((element, i) => {
        let thisA = []
        array[i].displayOptionValues.nodes.map((el, j) => {
            thisA.push(array[i].displayOptionValues.nodes[j].id);
        })
        let newRespo = []
        thisA.map((el, kk) => {
            newRespo.push(item[kk] === thisA[kk])
        })
        if (!newRespo.includes(false) && item.length === newRespo.length) {
            itemArray = element;
        }
    })
    return itemArray
}


export default function ProductData({product, variant = null}) {
    const {addToast} = useToasts()
    const [depthVariants, setVariants] = useState(product.depthVariants.nodes || []);
    const [currentVariant, setCurrentVariant] = useState({});
    const [selectedVariants, setSelectedVariants] = useState(createVariantObject(product.optionTypes));
    const [optionTypes, setOptionTypes] = useState(product.optionTypes.nodes);
    const [addQuantity, setAddQuantity] = useState(1);
    const {state, dispatch} = useContext(OrderContext);
    const [createOrder, {data: dataOrder, loading: loadingOrder, error: errorOrder}] = useMutation(CREATE_ORDER_MUTATION, {
        onCompleted: (newDataOrder) => {
            dispatch({type: "UPDATE_ORDER", payload: {...state.order, ...newDataOrder.createOrder.order}});
            setCookie('authorization_guest_token', newDataOrder.createOrder.order.guestToken)
            addToCart();
        }
    });

    function findVariantBySku(variants = [], sku = null) {
        let newVariant;
        if (sku) {
            newVariant = variants.find((el) => el.sku === sku);
        } else {
            newVariant = variants.find((el) => el.isMaster === true);
        }
        console.log(newVariant, "VARIANTE", sku ? "SI" : "NO", sku);
        if (!newVariant) {
            newVariant = variants.find((el) => el.isMaster === true);
        }
        return newVariant;
    }


    const [addToCart, {data: newData, loading, error}] = useMutation(ADD_PRODUCT_TO_CART_MUTATION, {
        variables: {
            variantId: currentVariant.id,
            quantity: addQuantity
        },
        onCompleted: (data) => {
            addToast('Producto agregado al carrito', {
                appearance: 'success',
                withlink: "/cart",
                withtext: "Ver carrito"
            })
            dispatch({type: "UPDATE_ORDER", payload: {...state.order, ...data.addToCart.order}});
        },
        update(cache, {data: {addToCart}}) {
            console.log("OO", addToCart)
            cache.modify({
                fields: {
                    data: {
                        order(oldOrder = {}) {
                            console.log(oldOrder, "OLD", cache)
                            // const newTodoRef = cache.writeFragment({
                            //     data: addToCart.order,
                            // });
                            return {...oldOrder};
                        }
                    }
                }
            });
        },
        onError: (e) => {
            addToast(e.message, {appearance: 'error'})
        }
    })

    useMemo(() => {
        let newCurrentVariant;
        if (variant) {
            newCurrentVariant = findVariantBySku(product.depthVariants.nodes.concat(product.masterVariant), variant)
            setCurrentVariant(newCurrentVariant);
        } else {
            newCurrentVariant = product.depthVariants.nodes.length > 0 ? product.depthVariants.nodes[0] : product.masterVariant || {}
            setCurrentVariant(newCurrentVariant);
        }
        if (product.depthVariants.nodes.length > 0) {
            // console.log(newCurrentVariant, "CURR")
            if (!emptyObject(newCurrentVariant)) {
                newCurrentVariant.displayOptionValues.nodes.map((optionValue, i) => {
                    optionTypes.map((optionType) => {
                        optionType.optionValues.nodes.map((depel) => {
                            let newSelected = {...selectedVariants, [optionType.name]: optionValue.id}
                            if (depel.id === optionValue.id) {
                                setSelectedVariants(oldState => ({...oldState, [optionType.name]: optionValue.id}))
                            }
                        })
                    })
                })
            }
        }
    }, [])


    const handleChange = (e) => {
        if (e.name) {
            let newSelectedVariants = {...selectedVariants, [e.name]: e.value}
            setSelectedVariants(newSelectedVariants);
            let arrayFormated = Object.values(newSelectedVariants).filter(n => n);
            let newVariant = isItemInArray(depthVariants, arrayFormated);
            if (newVariant) {
                setCurrentVariant(newVariant)
            } else {
                setCurrentVariant({});
                if (arrayFormated.length <= 0) {
                    setDefaultVariantAndOptions()
                }
            }
        } else {
            addToast('Input name is invalid', {appearance: 'error'})
        }
    }

    const setDefaultVariantAndOptions = () => {
        setCurrentVariant(product.masterVariant);
        product.masterVariant.displayOptionValues.nodes.map((optionValue, i) => {
            optionTypes.map((optionType) => {
                optionType.optionValues.nodes.map((depel) => {
                    let newSelected = {...selectedVariants, [optionType.name]: optionValue.id}
                    if (depel.id === optionValue.id) {
                        setSelectedVariants(oldState => ({...oldState, [optionType.name]: optionValue.id}))
                    }
                })
            })
        })
    }

    const handleAddToCart = () => {
        if (emptyObject(state.order)) {
            createOrder();
        } else {
            try {
                if (emptyObject(currentVariant)) {
                    addToast('La variante seleccionada no está disponible', {appearance: 'error'});
                    console.info("No hay variante seleccionada");
                } else {
                    addToCart();
                }
            } catch (e) {
                console.log("ERROR->", e)
            }
        }

    }


    return (
        <div className="w-full">
            <h1 className="font-medium text-3xl">{product.name}</h1>
            {currentVariant.defaultPrice ?
                <h2 className="font-medium text-gray-900 text-xl mt-4 mb-6">{currentVariant.defaultPrice.displayAmount} {currentVariant.defaultPrice.currency.isoCode}</h2>
                :
                <h2 className="text-gray-500 text-sm my-2">El artículo seleccionado no se encuentra disponible</h2>
            }
            {
                currentVariant.sku &&
                <h2 className="text-gray-700 text-sm mt-2 mb-6">SKU: {currentVariant.sku}</h2>
            }
            {
                depthVariants.length > 0 &&
                <div className="w-full mb-6">
                    <div className="w-full">
                        <div className="w-full space-y-4">
                            {
                                optionTypes.map((optionType, i) => (
                                    <div key={i} className="w-full flex flex-wrap">
                                        <p className="mb-2">
                                            <span
                                                className="w-full">{optionType.presentation}</span>
                                        </p>
                                        <div className="w-full flex space-x-4">
                                            {optionType.optionValues.nodes.map((optionValue, j) => (
                                                <div
                                                    onClick={() => {
                                                        if (selectedVariants[optionType.name] === optionValue.id) {
                                                            handleChange({name: optionType.name, value: null})
                                                        } else {
                                                            handleChange({name: optionType.name, value: optionValue.id})
                                                        }
                                                    }}
                                                    className={`
                                                        w-auto p-1 px-6 mb-3 border border-black cursor-pointer ${selectedVariants[optionType.name] === optionValue.id ? "border-black bg-black text-white" : ""}
                                                    `}
                                                    key={j}
                                                    id={`option_value_${optionValue.id}`}>
                                                    {optionValue.presentation}
                                                    {/*{currentVariants.includes(optionValue.id) ? optionValue.presentation : "-"}*/}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                ))
                            }
                        </div>
                    </div>
                </div>
            }

            <CounterSelector
                handleChange={(e) => {
                    setAddQuantity(parseInt(e.target.value));
                }} defaultValue={1}
            />
            <ButtonsPrimary
                disabled={emptyObject(currentVariant)}
                customClass="w-full text-center justify-center"
                loading={loading}
                text={"Agregar al carrito"}
                onClick={handleAddToCart}
            />
            {product.description &&
            <>
                <p className="font-light text-sm mt-6 text-gray-700 mb-4 whitespace-pre">
                    {product.description}
                </p>
            </>
            }
            <ProductProperties product={product}/>
            <ProductTaxons product={product}/>
            <ProductShareButtons/>
        </div>
    )
}