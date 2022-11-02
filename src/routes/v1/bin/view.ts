import { bin } from '../../../interface/bin';
import Database from '../../../schemas/bin';

module.exports = (req: any, res: any) => {
  const { code } = req.params;

  if (!code)
    return res.status(400).send({
      success: false,
      herf: req.originalUrl,
      message: 'Missing Field Value(s)',
    });

  Database.findOne({ UrlCode: code }, async (err: any, data: bin) => {
    if (err) {
      return res.status(500).send({
        success: false,
        herf: req.originalUrl,
        message: 'Internal Database Error',
      });
    }
    if (data) {
      if (data.DeleteAfterView === true) data.delete();
      return res.status(200).send({
        success: true,
        herf: req.originalUrl,
        message: 'Success bin found! Displaying information for bin: ' + code,
        data: {
          Title: data.Title,
          Description: data.Description,
          Date: data.Date,
          UrlCode: data.UrlCode,
          Content: data.Content,
          DeleteAfterView: data.DeleteAfterView,
        },
      });
    } else {
      return res.status(404).send({
        success: false,
        herf: req.originalUrl,
        message: 'Bin not found',
      });
    }
  });
};
