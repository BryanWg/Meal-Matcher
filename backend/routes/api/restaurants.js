const router = require('express').Router();
const axios = require('axios');
const { parse, stringify, toJSON, fromJSON } = require('flatted');
const fetch = require('node-fetch');
var util = require('util');
const key = process.env.GOOGLE_API_KEY;

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
    let placeRequest = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.latitude},${req.query.longitude}&radius=${req.query.radius}&type=restaurant&key=${key}`;
    let nextPageToken = null;
    let restaurants = [];

    //do {
    await axios.get(nextPageToken == null ? placeRequest : (placeRequest + '&pagetoken=' + nextPageToken))
        .then(result => {
            restaurants.push(result.data.results);
            console.log(result.data);
            console.log(result.data.results.length);
            nextPageToken = result.data.next_page_token;
            //console.log('token-------->', nextPageToken);

        })
        .catch(err => res.status(400).send('Error: ' + err));
    //} while (nextPageToken != null && restaurants.length < 60);
    //console.log(restaurants)
    res.status(200).status(200).send(...restaurants);
});

router.get('/details', async (req, res) => {
    console.log(req.query);
    let placeRequest = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.query.place_id}&fields=review,name,rating,formatted_phone_number&key=${key}`;

    await axios.get(placeRequest)
        .then(result => {
            console.log(result.data.result);
            const x = result.data.result;
            res.status(200).send(result.data.result);
        })
        .catch(err => res.status(400).send('Error: ' + err));
});

async function GetRestaurant(placeRequest) {
    await fetch(placeRequest);
}
module.exports = router;
