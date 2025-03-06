// ipoController.js
import IpoModel from '../models/ipo-model.js';
import { generateIPOData } from '../services/gmp-generator.service.js';

export const generateIpoGmp = async (req, res) => {
  try {
    console.log('Inside generate IPO GMP');
    const { count } = req.query;
    const ipoData = generateIPOData(Number(count)); // Ensure count is a number

    console.log(ipoData);

    // Insert generated IPO data into the MongoDB collection
    const insertedData = await IpoModel.insertMany(ipoData);

    res.json({ data: insertedData, message: 'GMP data inserted successfully' });
  } catch (error) {
    console.error('Error inserting IPO data:', error);
    res.status(500).json({ message: 'Failed to insert IPO data', error });
  }
};

export const findHighGmpIposEndingToday = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the start of today

    // Aggregate query to find IPOs with end date of today, GMP above 50, sorted by subscription
    const highGmpIpos = await IpoModel.aggregate([
      {
        $match: {
          startDate: { $gt: today }
        }
      },
      { $sort: { subscription: -1 } }, // Sort by subscription in descending order
      {
        $project: {
          ipoName: 1,
          gmp: 1,
          startDate: 1,
          endDate: 1,
          subscription: 1
        }
      }
    ]);

    res.json({
      data: highGmpIpos,
      message: 'IPOs with high GMP ending today fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching high GMP IPOs ending today:', error);
    res.status(500).json({ message: 'Failed to fetch IPOs', error });
  }
};
