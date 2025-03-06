export const healthCheck = async (req, res) => {
  try {
    console.log('Testing health check');
    res.json({ message: 'Backend API still running' });
  } catch (error) {}
};
