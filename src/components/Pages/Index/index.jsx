import ComponentsListProducts from "../../ListProducts";
import BannerThree from "../../BannerThree";
import BannerWelcome from "./BannerWelcome";

export default function ComponentsPagesIndex({taxonomies, products}) {
    return (
        <div className="w-full bg-gray-100">
            <div className="w-full">
                <BannerWelcome/>
            </div>
            <div className="w-11/12 mx-auto space-y-10">
                {/*<div className="w-3/12">*/}
                {/*    <ComponentsListTaxons taxonomies={taxonomies}/>*/}
                {/*</div>*/}
                {/*<div className="w-9/12">*/}

                <div className="w-full">
                    <ComponentsListProducts products={products}/>
                </div>
                <div className="w-full">
                    <BannerThree
                        items={[
                            {
                                placeholderSrc: "",
                                src: "data:image/png;base64,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",
                                alt: "",
                                title: "Envío gratis",
                                description: "En pedidos superiores a $699.00"
                            },
                            {
                                placeholderSrc: "",
                                src: "data:image/png;base64,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",
                                alt: "",
                                title: "Mezcal certificado",
                                description: "Fabricado con los estandares de calidad más altos"
                            },
                            {
                                placeholderSrc: "",
                                src: "data:image/png;base64,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",
                                alt: "",
                                title: "Soporte 24/7",
                                description: "Siempre contigo, de principio a fin"
                            }
                        ]}/>
                </div>
                {/*</div>*/}
            </div>
        </div>
    )
}