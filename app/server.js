require('dotenv').config()
const express = require('express')

const app = express()
const port = process.env.PORT || 8080;
const router = express.Router();

const mapToFilter = require('./filters')
const {
  orderedBy,
  orderedByMake,
  orderedBySearchType,
  orderedBySearchTypeAndMake
} = require('./repository')

router.get('/top_cars', async function(req, res){
  const filter = mapToFilter(req.query.selector)
  const cars = await orderedBy(filter, req.query.limit)
  res.json(cars)
})

router.get('/top_cars/:searchType', async function (req, res) {
  const filter = mapToFilter(req.query.selector)
  const cars = await orderedBySearchType(req.params.searchType, filter, req.query.limit)
  res.json(cars)
})

router.get('/top_cars/:searchType/:make', async function (req, res) {
  const filter = mapToFilter(req.query.selector)

  const cars = await orderedBySearchTypeAndMake(req.params.make, req.params.searchType, filter, req.query.limit)
  res.json(cars)
})

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
