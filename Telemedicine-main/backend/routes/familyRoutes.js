const express = require('express');
const { registerFamily, fetchFamily, fetchTotalFamily } = require('../controllers/familyController');
const { route } = require('./hwRoutes');


const router = express.Router();

router.post('/fetch' , fetchFamily)
router.post('/register', registerFamily)
router.get('/countFamily',fetchTotalFamily)

module.exports = router;