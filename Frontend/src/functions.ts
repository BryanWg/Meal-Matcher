import axios from 'axios'

export default async function GetRestaurant() {
    const key = ''
    const neighborhood = 'chelsea'
    const borough = 'manhattan'
    const city = 'new+york+city'
    const category = 'burgers'

    return axios.get('http://localhost:5000/restaurants')

}