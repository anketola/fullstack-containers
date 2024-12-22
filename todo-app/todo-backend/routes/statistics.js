const express = require('express');
const router = express.Router();
const redis = require('../redis')
const configs = require('../util/config')
const { getAsync } = require('../redis')


/* GET index data. */
router.get('/', async (req, res) => {
  counter = await getAsync("added_todos") || 0
  res.send({ added_todos: parseInt(counter, 10) })
});

module.exports = router;
