import { useQuery, useMutation } from "react-query";
import * as api from "../components/apiService";
import { FormValues } from "../routes/registration/RegisterCar";
import { toast } from "react-toastify";
import { UseFormReset } from "react-hook-form";
import { TrueLiteral } from "typescript";

export enum ServerStateKeyEnum {
    Cars = 'cars',
    CarStats = 'carStats'
}

export const useGetCars = () => {
   return useQuery(ServerStateKeyEnum.Cars, async () => {
    const { data } = await api.findCars();
    return data;
  });
}

export const useGetCarStats = (car: any) => {
    return useQuery([ServerStateKeyEnum.CarStats, car], async () => {
        const { data } = await api.findCarStats(car);
        return data;
      }, {
        enabled: car !== null
    });
}

export const useRegisterCar = (reset: UseFormReset<FormValues>) => {
    return useMutation((data) => api.registerCar(data), {
        onSuccess: () => {
            toast.success('Car registered!');
                
            reset({
                name: '',
                plate: '',
                trackerSerialNumber: ''
            })
        },
        onError: () => {
            toast.error('Unable to registed car');
        }
    })
}
