const cheerio = require('cheerio')
const express = require('express')
const axios = require('axios')
const path = require('path');
const PORT = process.env.PORT || 5000;

function getAllDataJSON(country, callback) {
    let returnableJSON = {};
    
    axios.get(`http://country.io/${country}`).then(returned => {
        let c = cheerio.load(returned.data);
        let tds = c('td');

        for (var i = 0; i < tds.length; i = i+3) {
            //console.log(`${tds[i].children[0].data}`, tds[i+1].children[0].data)
            returnableJSON[`${tds[i].children[0].children[0].data}`] = tds[i+1].children[0].data
        }
        callback(JSON.stringify(returnableJSON));
    }).catch(err => {
        console.error('Error: ' , err);
    })
}

let look_away = "Nothing to see here! Look away."

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.send(look_away))
  .get('/fetch', (req, res) => getAllDataJSON("ethiopia", data => res.send(data)))
  .get('/country', (req, res) => { 
    getAllDataJSON(req.query.id, data => res.send(data))
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))