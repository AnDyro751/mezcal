import ButtonsPrimary from "../primary";

export default function AddProductToCart({product}) {
    return (
        <ButtonsPrimary onClick={handleClick} disabled={loading} loading={loading} text={"Agregar al carrito"}/>
    )
}