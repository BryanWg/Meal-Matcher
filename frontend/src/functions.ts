import { useEffect } from 'react';
import axios from 'axios';

export async function GetRestaurant(req: any) {
    return axios.get('http://localhost:5000/restaurants', {
        params: {
            ...req
        }
    });
}

export async function GetDetails(place_id: string) {
    return axios.get('http://localhost:5000/restaurants/details', {
        params: {
            place_id
        }
    });
}
