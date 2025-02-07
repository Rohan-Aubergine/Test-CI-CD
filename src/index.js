import express from 'express'
import cors from 'cors'
import config from './config/config.js';
import mongoose from 'mongoose';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { createServer } from 'http';
import exampleRoutes from './routes/exampleRoutes.js'
import {ApolloServer} from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4';
import resolvers from "./graphql/resolvers.js";



const typeDefs = `#graphql
scalar DateTime

type Query {
  record(id:ID!): Record
  records: [Record]
  ipos:[Ipo]
  ipoByTitle(title:String!):Ipo
  listedIposWithHighListingPrice:[Ipo]
  listedIposWithLowListingPrice:[Ipo]
}
type Subscription{
  hello:String
  recordCreated:Record,
  operationFinished: Operation!
}

type Operation{
  name: String!
  endDate: String!
}

type Mutation {
  createRecord(name: String!, position: String, level: String): Record
  deleteRecord(id: ID!): Boolean
  updateRecord(id: ID! name: String, position: String, level: String): Record
  scheduleOperation(name:String!):String!

}

type Ipo {
  id: ID
  title: String
  ipoOpenDate: DateTime
  ipoCloseDate: DateTime
  priceBandStart: Float
  priceBandEnd: Float
  listingDate: DateTime
  status: String
  isListed: Boolean
  listingPrice: String
  greyMarket: GreyMarket
}

type Record {
  id: ID
  name: String
  position: String
  level: String
}
type GreyMarket {
  gmpDate: String
  gmp: String
  estimatedListingPrice: String
  lastUpdated: String
}
`;

const app = express();

const httpServer= createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer({
  server:httpServer,
  path:'/graphql'
})

const wsServerCleanup=useServer({schema},wsServer)

const apolloServer= new ApolloServer({
  schema,
  plugins:[
    ApolloServerPluginDrainHttpServer({httpServer}),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await wsServerCleanup.dispose();
            
          }
        }
      }
    }
  ]
})

await apolloServer.start()

app.use('/graphql',
  cors(),
  express.json(),
  expressMiddleware(apolloServer)
)


mongoose.connect(config.mongo_uri)
  .then(
    () => {
      console.log('Connected to MongoDB')
    })
  .catch((error) => console.error('Connection error', error));



app.use('/api/v1', exampleRoutes);

// Start the simple express server
app.listen(config.port, () => {
  console.log(`Express Server is running on port ${config.express_port}`);
});


// Start the GQL Server with Web Sockets
httpServer.listen(4000,()=>{
  console.log(`Graphql server running on port ${config.graphql_port}`)
  console.log(`Web Socket Server Up on port ${config.graphql_port}`)
})

