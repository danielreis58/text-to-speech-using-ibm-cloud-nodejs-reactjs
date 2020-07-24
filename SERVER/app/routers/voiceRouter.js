let express = require('express');
let router = express.Router();
const controller = require('../controllers/voiceController.js');

router.post("/synthesize", controller.synthesize);

module.exports = router;