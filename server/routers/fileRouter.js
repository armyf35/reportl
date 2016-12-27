const router = require('express').Router();
const fileController = require('../controllers/fileController');

if (process.env.NODE_ENV !== 'production') {
  router.all('*', (req, res, next) => {
    console.log('formRouter');
    next();
  });
}

router.get('/', fileController.getAll);
router.get('/:id', fileController.getFileById);
// TODO: Implement fileController.updateFileById
// router.put('/:id', fileController.updateFileById);
router.delete('/:id', fileController.deleteFileById);
router.post('/', fileController.newFile);

module.exports = router;
