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

function createCurrentVariants(optionTypesParam) {
    let newArray = [];
    optionTypesParam.map((variant) => {
        variant.optionValues.nodes.map((optionValue) => {
            optionValue["isActive"] = true
        })
        newArray.push(variant);
    })
    console.log("SELEEE")
    return newArray
}


export default function ProductData({product}) {
    const [addToCart, {data: newData, loading, error}] = useMutation(ADD_PRODUCT_TO_CART_MUTATION, {
        client: apolloClient
    })

    const [depthVariants, setVariants] = useState(product.depthVariants.nodes || []);
    const [currentVariant, setCurrentVariant] = useState(product.masterVariant || {});
    const [selectedVariants, setSelectedVariants] = useState(createVariantObject(product.optionTypes));
    // const [currentVariants, setCurrentVariants] = useState(createCurrentVariants(product));
    const [optionTypes, setOptionTypes] = useState([]);
    useMemo(() => {
        setOptionTypes(createCurrentVariants(product.optionTypes.nodes))
    }, [])

    const handleChange = (e) => {
        if (e.name) {
            let newArray = [];
            product.optionTypes.nodes.map((variant) => {
                variant.optionValues.nodes.map((optionValue) => {
                    optionValue["isActive"] = optionValue.id === e.value ? true : false;
                    // optionValue.isActive =
                    // console.log(optionValue)
                })
                // variant.name = "DEMOOOO"
                console.log(variant)
                newArray.push(variant);
            })
            setOptionTypes(newArray);
            // console.log(currentProduct);
            // let currentElement = getCurrentElement(e.target.value, depthVariants);
            // console.log(currentElement, "NEW CU");
        } else {
            console.error("Input name is invalid");
        }
    }

    function getCurrentElement(id, thisVariants) {
        let currentElement;
        thisVariants.forEach((el) => {
            // el.displayOptionValues
            // let newCurrentElement = el.displayOptionValues.nodes.find((depel) => depel.id === id)
            // if (newCurrentElement) {
            //     currentElement = newCurrentElement
            // }
        });
        return currentElement;
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
                            {
                                optionTypes.map((optionType, i) => (
                                    <div key={i} className="w-full flex flex-wrap">
                                        <span
                                            className="w-full">{optionType.presentation}--- {optionType.optionValues.nodes.length}</span>
                                        {/*<select*/}
                                        {/*    onChange={handleChange}*/}
                                        {/*    name={`${optionType.name}`} id="">*/}
                                        {/*    {optionType.optionValues.nodes.map((optionValue, j) => (*/}
                                        {/*        <option*/}
                                        {/*            key={j}*/}
                                        {/*            value={optionValue.id}>{optionValue.presentation}</option>*/}
                                        {/*    ))}*/}
                                        <div className="w-full flex space-x-4">
                                            {optionType.optionValues.nodes.map((optionValue, j) => (
                                                <div
                                                    onClick={() => {
                                                        handleChange({name: optionType.name, value: optionValue.id})
                                                    }}
                                                    className={`w-auto p-1 px-6 mb-3 border ${optionValue.isActive ? "" : "opacity-50"}`}
                                                    key={j}
                                                    id={`option_value_${optionValue.id}`}>
                                                    {optionValue.presentation}---{optionValue.isActive ? "DEE" : "NO"}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                ))
                            }
                        </div>
                    </div>
                    <h3>Variantes:</h3>
                    <div className="w-full flex space-x-4">
                        {depthVariants.map((variant, i) => {
                            return (
                                <div
                                    key={i}
                                    className="w-auto px-5 py-1 border cursor-pointer hover:border-black transition duration-150 text-sm">
                                    <span>{
                                        variant.displayOptionValues.nodes.map((ov) => {
                                            return ov.presentation
                                        }).join("-")
                                    }</span>
                                </div>
                            )
                        })}
                    </div>
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
                onClick={addToCart}
            />
            {/*<button onClick={addToCart}>Agregar al carrito</button>*/}

        </div>
    )
}