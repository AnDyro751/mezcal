import {gql} from "@apollo/client";
import {apolloClient} from "../../lib/apollo";

const runQuery = (currentQuery, variables = {}, fetchPolicy = "no-cache", ctx) => {
    console.log(typeof ctx, "TYPEOF")
    const getQuery = async () => {
        let data = {};
        try {
            data = await apolloClient(ctx).query({
                query: gql`${currentQuery}`,
                fetchPolicy: fetchPolicy,
                variables: variables
            })
            data = data.data
            return data;
        } catch (e) {
            console.log("ERROR", e)
            return null
        }
    }
    return getQuery()
}

export default runQuery