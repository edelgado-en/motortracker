import { useQuery } from "react-query";
import * as api from "../components/apiService";

export enum ServerStateKeyEnum {
    Cars = 'cars'
}

export const useGetCars = () => {
   return useQuery(ServerStateKeyEnum.Cars, api.findCars);
}