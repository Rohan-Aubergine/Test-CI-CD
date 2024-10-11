// Import any required services or models here
const exampleService = require('../services/exampleService');



exports.healthCheck=async(req,res)=>{
    try {
        res.json({message:"Backend API ruuning"})
    } catch (error) {
        
    }
}
// Define your controller methods
exports.getExamples = async (req, res) => {
  try {
    const examples = await exampleService.getExamples();
    res.json(examples);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createExample = async (req, res) => {
  try {
    const { name } = req.body;
    const newExample = await exampleService.createExample(name);
    res.json(newExample);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};