

import { config } from 'dotenv'
const env=config('./env')


export default {
 port : process.env.PORT || 80,
 mongo_uri : process.env.MONGODB_URI

}

