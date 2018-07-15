var request = require('request');

request(
  {
    uri: 'http://192.168.33.159:5000/api/question/greeting',
    method: 'GET',
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
  },
  function(error, response, body) {
    console.log(body);
  }
);
