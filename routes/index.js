const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'weatherBot' });
});

router.get('/action', (req, res) => {
  res.send('This is the action page');
});

module.exports = router;
