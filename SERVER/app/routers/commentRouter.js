let express = require('express');
let router = express.Router();
const controller = require('../controllers/commentController.js');

router.post("/setcomment", controller.setComment);
router.get("/getcomments", controller.getComments);

module.exports = router;