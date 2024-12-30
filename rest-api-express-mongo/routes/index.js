const app = require('express');
const router = app.Router();

router.use('/employees', require('./employee'));
router.use('/departments', require('./department'));

module.exports = router;