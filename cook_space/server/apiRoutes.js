const express = require('express');
const router = express.Router();
const apiController = require('./controller/apiController');

router.get("/hi", apiController.apiTestFunc);
router.post("/insertFileList", apiController.apiInsertFiles);

module.exports = router;