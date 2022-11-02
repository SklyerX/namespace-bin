import Database from '../../../schemas/bin';

module.exports = (req: any, res: any) => {
  try {
    Database.find({}, '-_id -__v')
      .sort({ _id: -1 })
      .exec()
      .then((data: any) => {
        var arrayOfContent = [];

        for (const schemas of data) {
          if (schemas.DeleteAfterView !== true) {
            arrayOfContent.push(schemas);
          }
        }
        return res.status(200).send(arrayOfContent);
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      href: req.originalUrl,
      message: 'Internal Database Error',
    });
    return 0;
  }
};
