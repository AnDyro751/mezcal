import {useMutation} from "@apollo/client";
import {ADD_PRODUCT_TO_CART_MUTATION} from "../../../graphql/mutations/products/addProductToCart";
import {initializeApollo} from "../../../lib/apolloClient";
import ButtonsPrimary from "../../Buttons/primary";
import {useState, useEffect, useMemo} from 'react';

const apolloClient = initializeApollo()

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


export default function ProductData({product}) {

    const [depthVariants, setVariants] = useState(product.depthVariants.nodes || []);
    const [currentVariant, setCurrentVariant] = useState(product.depthVariants.nodes.length > 0 ? product.depthVariants.nodes[0] : product.masterVariant || {});
    const [selectedVariants, setSelectedVariants] = useState(createVariantObject(product.optionTypes));
    const [optionTypes, setOptionTypes] = useState(product.optionTypes.nodes);
    const [addToCart, {data: newData, loading, error}] = useMutation(ADD_PRODUCT_TO_CART_MUTATION, {
        client: apolloClient,
        variables: {
            variantId: currentVariant.id,
            quantity: 1
        },
        onError: (e) => {
            console.log("ERROR", e.message)
        }
    })

    useMemo(() => {
        console.log(product)
        if (product.depthVariants.nodes.length > 0) {
            currentVariant.displayOptionValues.nodes.map((optionValue, i) => {
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
    }, [])


    const handleChange = (e) => {
        if (e.name) {
            let newSelectedVariants = {...selectedVariants, [e.name]: e.value}
            setSelectedVariants(newSelectedVariants);
            let newVariant = isItemInArray(depthVariants, Object.values(newSelectedVariants).filter(n => n));
            if (newVariant) {
                setCurrentVariant(newVariant)
            } else {
                setCurrentVariant({})
            }
            console.log(newVariant, "IS")
        } else {
            console.error("Input name is invalid");
        }
    }

    const handleAddToCart = () => {
        try {
            addToCart()
        } catch (e) {
            console.log("ERROR->", e)
        }
    }


    return (
        <div className="w-full">
            <h1 className="font-medium text-4xl">{product.name}</h1>
            {currentVariant.defaultPrice ?
                <h2 className="font-medium text-gray-900 text-xl my-4">{currentVariant.defaultPrice.displayAmount} {currentVariant.defaultPrice.currency.isoCode}</h2>
                :
                <h2 className="text-gray-500 text-sm my-2">El artículo seleccionado no se encuentra disponible</h2>
            }
            {
                depthVariants.length > 0 &&
                <div className="w-full mb-4">
                    <div className="w-full">
                        <h3>
                            OptionTypes
                        </h3>
                        <div className="w-full">
                            <h3>
                                TSIZE: {selectedVariants["tshirt-size"]}
                            </h3>
                            <h3>
                                TCOLOR: {selectedVariants["tshirt-color"]}
                            </h3>
                            {
                                optionTypes.map((optionType, i) => (
                                    <div key={i} className="w-full flex flex-wrap">
                                        <span
                                            className="w-full">{optionType.presentation}</span>
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
                                                        w-auto p-1 px-6 mb-3 border 
                                                        ${selectedVariants[optionType.name] === optionValue.id ? "border-black" : "opacity-50"}
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
                    {/*<h3>Variantes:</h3>*/}
                    {/*<div className="w-full flex space-x-4">*/}
                    {/*    {depthVariants.map((variant, i) => {*/}
                    {/*        return (*/}
                    {/*            <div*/}
                    {/*                key={i}*/}
                    {/*                className="w-auto px-5 py-1 border cursor-pointer hover:border-black transition duration-150 text-sm">*/}
                    {/*                <span>{*/}
                    {/*                    variant.displayOptionValues.nodes.map((ov) => {*/}
                    {/*                        return ov.presentation*/}
                    {/*                    }).join("-")*/}
                    {/*                }</span>*/}
                    {/*            </div>*/}
                    {/*        )*/}
                    {/*    })}*/}
                    {/*</div>*/}
                </div>
            }
            {product.description &&
            <>
                <h3 className="mb-2 font-medium">Descripción:</h3>
                <h4 className="font-light text-sm text-gray-600 mb-4">{product.description}</h4>
            </>
            }
            <ButtonsPrimary
                customClass="w-full text-center justify-center"
                loading={loading} text={"Agregar al carrito"}
                onClick={handleAddToCart}
            />
        </div>
    )
}