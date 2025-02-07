

import { config } from 'dotenv'
const env=config('./env')


export default {
 graphql_port : process.env.GRAPHQL_PORT||4000,
 express_port : process.env.EXPRESS_PORT || 3000,
 mongo_uri : process.env.MONGO_URI

}

