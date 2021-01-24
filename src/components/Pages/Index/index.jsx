import ComponentsListTaxons from "../../ListTaxons";
import ComponentsListProducts from "../../ListProducts";
import BannerThree from "../../BannerThree";

export default function ComponentsPagesIndex({taxonomies, products}) {
    return (
        <div className="w-full bg-gray-100">
            <div className="w-11/12 mx-auto pt-8 md:pt-10 space-y-10">
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
                                src: "",
                                alt: "",
                                title: "Envío gratis",
                                description: "En pedidos superiores a $699.00"
                            },
                            {
                                placeholderSrc: "",
                                src: "",
                                alt: "",
                                title: "Mezcal certificado",
                                description: "Fabricado con los estandares de calidad más altos"
                            },
                            {
                                placeholderSrc: "",
                                src: "",
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