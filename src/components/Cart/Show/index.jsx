import Link from 'next/link'
import {LazyLoadImage} from "react-lazy-load-image-component";
import GetImageUrl, {generateUrlPath} from "../../../lib/getImageUrl";
import {CounterSelector} from "../../Buttons/CounterSelector";
import {useState} from 'react';
import CartListLineItems from "../ListLineItems";

const CartShow = ({currentOrder = {}}) => {
    return (
        <div className="w-full">
            <CartListLineItems currentOrder={currentOrder}/>
        </div>
    )
}

export default CartShow