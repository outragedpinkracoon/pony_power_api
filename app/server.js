const express = require('express')

const app = express()
const port = process.env.SERVER_PORT || 8080;
const router = express.Router();

router.get('/', function (req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
