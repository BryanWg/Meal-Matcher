import axios from 'axios'

export default async function GetRestaurant(req: any) {
    return axios.get('http://localhost:5000/restaurants', {
        params: {
            ...req
        }
    })
}