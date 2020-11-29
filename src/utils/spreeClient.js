import {makeClient} from '@spree/storefront-api-v2-sdk'

const SpreeClient = makeClient({
    host: 'http://localhost:3001'
})
export default SpreeClient;