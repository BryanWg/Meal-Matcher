const router = require('express').Router();
const axios = require('axios')
router.get('/', (req, res) => {
    const key = 'AIzaSyA16hl91N_Ecfoa25neGfdITZqObq0DZcE'
    const neighborhood = 'chelsea'
    const borough = 'manhattan'
    const city = 'new+york+city'
    const category = 'burgers'

    axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${category}+${neighborhood}+${borough}+${city}&type=restaurant&key=${key}`
    )
        .then(restaurants => res.send(restaurants))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;