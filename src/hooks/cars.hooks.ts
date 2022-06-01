import { useQuery, useMutation } from "react-query";
import * as api from "../components/apiService";
import { FormValues } from "../routes/registration/RegisterCar";
import { toast } from "react-toastify";
import { UseFormReset } from "react-hook-form";

export enum ServerStateKeyEnum {
    Cars = 'cars'
}

export const useGetCars = () => {
   return useQuery(ServerStateKeyEnum.Cars, api.findCars);
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
