module.exports = (req: any, res: any) => {
  return res.status(200).send({
    success: true,
    message: 'The api is active and healthy.',
  });
};