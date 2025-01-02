import {DateTimeResolver} from 'graphql-scalars'
import recordModel from "../models/example.js";
import IpoModel from '../models/ipo-model.js';
import { subscribe } from 'graphql';
import {PubSub} from 'graphql-subscriptions'


const pubsub= new PubSub();

const mockLongLastingOperation=(name)=>{
  setTimeout(()=>{
    pubsub.publish('OPERATION_FINISHED',{operationFinished:{name,endDate: new Date().toDateString()}})
  },1000)
}

const resolvers = {
  DateTime:DateTimeResolver,
  Record: {
    id: (parent) => parent.id ?? parent._id,
  },
  Ipo:{
    id:(parent)=>parent.id?? parent._id,
  },
  Query: {
 
    async record(_, { id }) {
        const record=await recordModel.findOne({id})
        return record
    },

    async records(_, __, context) {
      const records = await recordModel.find({});
      return records;
    },

    async ipos(_,__,context){
      const ipos = await IpoModel.find();
      // console.log(ipos)
      return ipos
    },

    async ipoByTitle(_,{title}){
      try {
        return await IpoModel.findOne({title})
      } catch (error) {
        throw new Error('Error fetching Ipo:',+error.message)
        
      }
    },

    async listedIposWithHighListingPrice() {
      try {
        return await IpoModel.find({
          isListed: true,
          $expr: {
            $gt: [
              { 
                $toDouble: { 
                  $replaceAll: { input: "$listingPrice", find: "₹", replacement: "" } 
                }
              },
              { 
                $toDouble: { 
                  $replaceAll: { input: "$greyMarket.estimatedListingPrice", find: "₹", replacement: "" } 
                }
              }
            ]
          }
        });
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching high listing IPOs");
      }
    },

    async listedIposWithLowListingPrice(){
      try {
        return await IpoModel.find({
          isListed: true,
          $expr: {
            $lt: [
              { 
                $toDouble: { 
                  $replaceAll: { input: "$listingPrice", find: "₹", replacement: "" } 
                }
              },
              { 
                $toDouble: { 
                  $replaceAll: { input: "$greyMarket.estimatedListingPrice", find: "₹", replacement: "" } 
                }
              }
            ]
          }
        });
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching high listing IPOs");
      }

    }
    

    // async openIPOsWithHighGmp() {
    //   try {
    //     const today = new Date();
    //     today.setHours(0, 0, 0, 0); // Set to the start of today
    //     // const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000); // Start of tomorrow
    
    //     const highGmpIpos = await IpoModel.aggregate([
    //       {
    //         $match: {
    //           gmp: { $gt: 80 }, // GMP greater than 50
    //           endDate: { $gte: today } // IPOs ending today
    //         }
    //       },
    //       { $sort: { subscription: -1 } }, // Sort by subscription descending
    //       {
    //         $project: {
    //           ipoName: 1,
    //           gmp: 1,
    //           startDate: 1,
    //           endDate: 1,
    //           subscription: 1
    //         }
    //       }
    //     ]);
    
    //     return highGmpIpos;
    //   } catch (error) {
    //     console.error('Error fetching high GMP IPOs ending today:', error);
    //     throw new Error('Failed to fetch high GMP IPOs ending today');
    //   }
    // }
    
  },
  Mutation: {
    async createRecord(_, { name, position, level }, context) {
      const insertedRecord = await recordModel.create({name,position,level})
      if (!insertedRecord){
        return null;
      }else{
        return insertedRecord

      }
     
  
    },
    async updateRecord(_, args, context) {
      const id = new ObjectId(args.id);
      let query = { _id: new ObjectId(id) };
      let collection = await db.collection("records");
      const update = await collection.updateOne(
        query,
        { $set: { ...args } }
      );

      if (update.acknowledged)
        return await collection.findOne(query);

      return null;
    },
    async deleteRecord(_, { id }, context) {
      let collection = await db.collection("records");
      const dbDelete = await collection.deleteOne({ _id: new ObjectId(id) });
      return dbDelete.acknowledged && dbDelete.deletedCount == 1 ? true : false;
    },
    scheduleOperation(_,{name}){
      console.log(`Mocking operation: ${name}`)
      mockLongLastingOperation(name);
      return `Operation: ${name} scheduled`;
      
    }

  },
  Subscription: {
    hello: {
      // Example using an async generator
      subscribe: async function* () {
        for await (const word of ['Hello', 'Bonjour', 'Ciao']) {
          yield { hello: word };
        }
      },
    },
    recordCreated: {
      // More on pubsub below
      subscribe: () => pubsub.asyncIterator(['POST_CREATED']),
    },
    operationFinished:{
      subscribe:()=>pubsub.asyncIterableIterator(['OPERATION_FINISHED'])

      }
    
   
  },
};

export default resolvers;