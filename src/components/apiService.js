import httpService from '../services/httpService';

export const registerCar = (requestObject) => {
    return httpService.post('/car/register', requestObject);
}

export const findCars = () => {
    return httpService.get('/car');
}

export const findCarStats = (requestObject, pageNumber) => {
    return httpService.post(`/car/stats/search?size=5&page=${pageNumber}&sort=timeStamp,desc`, requestObject);
}

export const signUser = (requestObject) => {
    return httpService.post('/user/signin', requestObject);
}

export const editCar = (requestObject) => {
    return httpService.post('/car/edit', requestObject);
}