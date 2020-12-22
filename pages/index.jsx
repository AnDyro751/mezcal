import LayoutApplication from "../src/components/Layout/application";
import {MAIN_QUERY} from "../src/graphql/queries/main";
import runQuery from "../src/graphql/queries/runQuery";

function Home({data}) {
    const {currentOrder} = data;
    return (
        <LayoutApplication currentOrder={currentOrder} data={data}>
            <h1 className="text-4xl">Index</h1>
        </LayoutApplication>
    )
}

export default Home


export async function getServerSideProps({}) {
    const data = await runQuery(MAIN_QUERY())
    return {
        props: {
            data: data
        }
    }
}
