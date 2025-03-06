import mongoose from 'mongoose';

// const ipoSchema = new mongoose.Schema({
//     ipoName: String,
//     startDate: Date,
//     endDate: Date,
//     subscription: Number,
//     gmp: Number,
//     timestamp: {
//         type: Date,
//         required: true,
//     }
// }, {
//     timeseries: {
//         timeField: 'timestamp', // Specify the timestamp field
//         metaField: 'metadata',  // Optional: Metadata field, if needed
//         granularity: 'minutes',    // Can be 'seconds', 'minutes', or 'hours'
//     },
//     expireAfterSeconds: 31536000 // Optional: Data expiration (e.g., 1 year)
// });

const ipoSchema = new mongoose.Schema({
  title: { type: String, required: true }, // IPO title
  ipoOpenDate: { type: Date, required: true }, // Opening date of the IPO
  ipoCloseDate: { type: Date, required: true }, // Closing date of the IPO
  priceBandStart: { type: Number, required: true },
  priceBandEnd: { type: Number, required: true },
  listingDate: { type: Date }, // Date the IPO is listed
  status: { type: String, enum: ['Upcoming', 'Open', 'Closed', 'Listed'], required: true }, // Current status of the IPO
  isListed: { type: Boolean, default: false }, // Indicates if the IPO has been listed
  listingPrice: { type: String }, // The final listing price of the IPO
  greyMarket: {
    gmpDate: { type: String }, // Date and description for GMP
    gmp: { type: String }, // Current GMP price
    estimatedListingPrice: { type: String }, // Estimated listing price
    lastUpdated: { type: String } // Timestamp of the last GMP update
  }
});

const IpoModel = mongoose.model('IPOData', ipoSchema, 'ipo_data');

// Create the time series collection in MongoDB
// const IpoModel = mongoose.model('IPOData', ipoSchema, 'ipo_data');
export default IpoModel;
