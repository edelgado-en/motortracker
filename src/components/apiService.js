import httpService from '../services/httpService';

export const registerCar = (requestObject) => {
    return httpService.post('/car/register', requestObject);
}

export const findCars = () => {
    return httpService.get('/car');
}

export const findCarStats = (requestObject, pageNumber) => {
    const page = pageNumber > 0 ? pageNumber - 1 : 0;
    return httpService.post(`/car/stats/search?size=5&page=${page}&sort=timeStamp,desc`, requestObject);
}

export const signUser = (requestObject) => {
    return httpService.post('/user/signin', requestObject);
}

export const editCar = (requestObject) => {
    return httpService.post('/car/edit', requestObject);
}