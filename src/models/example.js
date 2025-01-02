import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
    name: String,
    position:String,
    level:String,
});

// Create the time series collection in MongoDB
const recordModel = mongoose.model('recordData', recordSchema, 'record_data');
export default recordModel
