const router = require('express').Router();
const axios = require('axios');
const weatherKey = require('./weatherKey');

router.get('/weather', async (req, res) => {
  const { city, region, country } = req.query;

  const params = {
    access_key: weatherKey,
    query: `${city}, ${region}, ${country}`,
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

router.get('/cities', async (req, res) => {
  const { searchTerm } = req.query;

  const axios = require('axios');

  axios({
    method: 'GET',
    url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
      'x-rapidapi-key': '2729484a2amsh81fb424cfc9ec44p10fec6jsn8236b7232769',
      useQueryString: true,
    },
    params: {
      namePrefix: searchTerm,
      sort: 'name',
      types: 'CITY',
    },
  })
    .then((response) => {
      const results = response.data;

      if (results.length === 0) {
        res.sendStatus(404);
      } else {
        res.send(results);
      }
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

router.get('*', (req, res) => {
  res.redirect('/');
});

module.exports = router;
