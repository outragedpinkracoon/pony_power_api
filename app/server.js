require('dotenv').config()
const express = require('express')

const app = express()
const port = process.env.PORT || 8080;
const router = express.Router();

const mapToFilter = require('./filters')
const {
  orderedCars
} = require('./repository')

router.get('/top_cars', async function(req, res){
  const filter = mapToFilter(req.query.selector)
  const cars = await orderedCars(filter, req.query.limit)
  res.json(cars);
})

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
