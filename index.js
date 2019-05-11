const cheerio = require('cheerio')
const express = require('express')
const axios = require('axios')

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

getAllDataJSON("ethiopia", data => {
    console.log(data);
})