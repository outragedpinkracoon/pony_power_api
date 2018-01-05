require('dotenv').config()
const express = require('express')

const app = express()
const port = process.env.PORT || 8080;
const router = express.Router();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const mapToFilter = require('./filters')
const {
  orderedBy
} = require('./repository')

router.get('/top_cars', async function(req, res){
  const filter = mapToFilter(req.query.selector)
  const params = { limit: req.query.limit }

  const cars = await orderedBy(filter, params)
  res.json({cars: cars})
})

router.get('/top_cars/:searchType', async function (req, res) {
  const filter = mapToFilter(req.query.selector)
  const params = { limit: req.query.limit, searchType: req.params.searchType }

  const cars = await orderedBy(filter, params)
  res.json({ cars: cars })
})

router.get('/top_cars/:searchType/:make', async function (req, res) {
  const filter = mapToFilter(req.query.selector)
  const params = { limit: req.query.limit, searchType: req.params.searchType, make: req.params.make }

  const cars = await orderedBy(filter, params)
  res.json({ cars: cars })
})

app.use('/api', router);

app.listen(port);
console.log('Server running on port ' + port);
