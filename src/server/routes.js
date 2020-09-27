const router = require('express').Router();
const axios = require('axios');
const weatherKey = require('./weatherKey');

router.get('/weather', async (req, res) => {
  const { city, country } = req.query;
  console.log(req.query);

  const params = {
    access_key: weatherKey,
    query: `${city}, ${country}`,
  };

  const data = await axios
    .get('http://api.weatherstack.com/current', { params })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      res.send(500);
    });

  res.send(data.current);
});

router.get('*', (req, res) => {
  res.redirect('/');
});

module.exports = router;
