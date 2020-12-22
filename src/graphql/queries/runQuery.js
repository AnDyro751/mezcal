import {gql} from "@apollo/client";
import {apolloClient} from "../../lib/apollo";

const runQuery = (currentQuery, variables = {}, fetchPolicy = "no-cache") => {
    const getQuery = async () => {
        let data = {};
        try {
            data = await apolloClient.query({
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