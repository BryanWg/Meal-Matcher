const router = require('express').Router();
const axios = require('axios')
const { parse, stringify, toJSON, fromJSON } = require('flatted');

router.get('/', (req, res) => {
    const key = 'AIzaSyA16hl91N_Ecfoa25neGfdITZqObq0DZcE'
    const neighborhood = 'chelsea'
    const borough = 'manhattan'
    const city = 'new+york+city'
    const category = 'burgers'

    axios.get(
        //`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${category}+${neighborhood}+${borough}+${city}&type=restaurant&key=${key}`
        //`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${key}`
        'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyA16hl91N_Ecfoa25neGfdITZqObq0DZcE'
    )
        .then(restaurants => res.send(stringify(restaurants)))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
