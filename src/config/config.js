
require('dotenv').config('./env')

module.exports={
    port : process.env.PORT || 300,
mongo_uri : process.env.MONGODB_URI

}

