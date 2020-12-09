import runQuery from "../src/graphql/queries/runQuery";
import {MAIN_QUERY} from "../src/graphql/queries/main";
import PagesError from "../src/pages/error";
import LayoutApplication from "../src/components/Layout/application";

const PagesCart = ({data}) => {
    if (!data) {
        return (
            <PagesError big={false} message={"Ha ocurrido un error"}/>
        )
    }
    const {currentOrder} = data;
    return (
        <LayoutApplication currentOrder={currentOrder}>
            <div className="w-full">
                <h1>Carrito</h1>
            </div>
        </LayoutApplication>
    )
}

export async function getServerSideProps() {
    const data = await runQuery(MAIN_QUERY())
    return {
        props: {
            data: data
        }
    }
}

export default PagesCart