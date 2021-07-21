const router = require('express').Router();
const axios = require('axios');
const { parse, stringify, toJSON, fromJSON } = require('flatted');
const fetch = require('node-fetch');
var util = require('util');

const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};

router.get('/', async (req, res) => {
    console.log(req.query);
    let placeRequest = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.latitude},${req.query.longitude}&radius=${req.query.radius}&type=restaurant&key=AIzaSyCYSVPtRpCwr32epWWbWvtfMttFOXw2lMY`;
    let nextPageToken = null;
    let restaurants = [];

    //do {
        await axios.get(nextPageToken == null ? placeRequest : (placeRequest + '&pagetoken=' + nextPageToken))
            .then(result => {
                restaurants.push(result.data.results);
                console.log(result.data);
                console.log(result.data.results.length)
                nextPageToken = result.data.next_page_token;
                //console.log('token-------->', nextPageToken);
                
            })
            .catch(err => res.status(400).json('Error: ' + err));
    //} while (nextPageToken != null && restaurants.length < 60);
    //console.log(restaurants)
    res.status(200).send(...restaurants);
});

async function GetRestaurant(placeRequest) {
    await fetch(placeRequest);
}
module.exports = router;
