import { bin } from '../../../interface/bin';
import Database from '../../../schemas/bin';
import { generateWords } from '../../../utils/generator/characters';

module.exports = (req: any, res: any) => {
  const { Title, Description, DeleteAfterView, Content } = req.body;

  if (!Title || !Description || !Content)
    return res.status(400).send({
      success: false,
      herf: req.originalUrl,
      message: 'Missing Field Value(s)',
    });

  if ('DeleteAfterView' in req.body == false)
    return res.status(400).send({
      success: false,
      herf: req.originalUrl,
      message: 'Missing Field Value(s) - Booleans',
    });

  if (
    typeof Title !== 'string' ||
    typeof Description !== 'string' ||
    typeof DeleteAfterView !== 'boolean' ||
    typeof Content !== 'string'
  )
    return res.status(400).send({
      success: false,
      herf: req.originalUrl,
      message: 'Invalid Field Types',
    });

  const generateKey = generateWords(8);

  if (Title.length >= 20)
    return res.status(409).send({
      success: false,
      herf: req.originalUrl,
      message: 'Title length exeeded',
    });

  if (Description.length >= 60)
    return res.status(409).send({
      success: false,
      herf: req.originalUrl,
      message: 'Description length exeeded',
    });

  Database.findOne({ UrlCode: generateKey }, async (err: any, data: bin) => {
    if (err) {
      return res.status(500).send({
        success: false,
        herf: req.originalUrl,
        message: 'Internal Database Error',
      });
    }
    if (!data) {
      new Database({
        Title,
        Description,
        Date: Date.now(),
        DeleteAfterView,
        Content,
        UrlCode: generateKey,
      }).save();

      return res.status(200).send({
        success: true,
        herf: req.originalUrl,
        message: 'Success! New bin created',
        data: {
          urlCode: generateKey,
        },
      });
    } else {
      const newKey = generateWords(8);

      new Database({
        Title,
        Description,
        Date: Date.now(),
        DeleteAfterView,
        Content,
        UrlCode: newKey,
      }).save();

      return res.status(200).send({
        success: true,
        herf: req.originalUrl,
        message: 'Success! New bin created',
        data: {
          urlCode: newKey,
        },
      });
    }
  });
};
