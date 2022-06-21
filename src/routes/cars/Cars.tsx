/* eslint-disable jsx-a11y/no-redundant-roles */
import { ServerIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";
import { useGetCars } from "../../hooks/cars.hooks";

import { useMutation, useQueryClient } from 'react-query';
import React, { useState } from "react";

import * as api from "../../components/apiService";

import { toast } from "react-toastify";

import { FileUploader } from "react-drag-drop-files";

export type FormValues = {
    id: number,
    name: string,
    plate: string,
    trackerSerialNumber: string
}

type Car = {
    id: number,
    name: string,
    plate: string,
    imageUrl: string,
    trackerSerialNumber: string,
    expanded: boolean
}

const fileTypes = ["JPG", "PNG"];

const Cars = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
  
  const { mutate: mutateUpload, isLoading: uploadLoading } = useMutation(api.uploadCarImage, {
    onSuccess: () => {
        queryClient.invalidateQueries('cars');

        toast.success('Image uploaded');

    },
    onError: (error) => {
        toast.error('Unable to upload image');
    }    
  });

  const { mutate, isLoading } = useMutation(api.editCar, {
    onSuccess: () => {
        queryClient.invalidateQueries('cars');

        toast.success('Car updated successfully');

    },
    onError: (error) => {
        toast.error('Failed to update car');
    }
  })

  const { data: cars } = useGetCars();

  console.log(cars);
    
  const handleFileChange = (file: any, carId: number) => {

    const formData = new FormData();
    formData.append("file", file);
    formData.append("carId", carId.toString());

    mutateUpload(formData);
  }

  const onSubmit = handleSubmit((data: any) => {
    mutate(data);
  })

  const expandCar = (car: Car) => {
    let items = [...cars];

    items = items.map(item => {
        if (item.id === car.id) {
            item.expanded = true;
        } else {
            item.expanded = false;
        }

        return item;
    });

    reset({
        id: car.id,
        name: car.name,
        plate: car.plate,
        trackerSerialNumber: car.trackerSerialNumber,
    })

    queryClient.setQueryData('cars', items)

  }

  const closeCar = () => {
    let items = [...cars];

    items = items.map(item => {
        item.expanded = false;

        return item;
    });

    queryClient.setQueryData('cars', items)
  }

  return (
    <div
      style={{
        maxWidth: "40%",
        minWidth: "400px",
        margin: "auto",
        marginTop: "100px",
      }}
    >
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {cars && cars.map((car: Car) => (
              <React.Fragment key={car.id}>
                <li>
                    <a href="#" className="block hover:bg-gray-50">
                    <div className="px-4 py-4 flex flex-row items-center sm:px-6 h-24">
                        <div className="basis-[25%] sm:items-center">
                            
                            {car.imageUrl ?
                                <img src={car.imageUrl} alt="..." className="h-20" />
                                :
                                <div className="px-7">
                                    <FileUploader handleChange={(file: any) => handleFileChange(file, car.id)}
                                              name="file"
                                              label="Upload picture"
                                              types={fileTypes} />
                                </div>
                            }

                        </div>
                        <div className="basis-[70%] sm:items-center">
                            <div className="truncate">
                                <div className="flex text-sm">
                                    <p className="font-medium text-indigo-600 truncate">
                                        {car.name}
                                    </p>
                                    <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                                        {car.plate}
                                    </p>
                                </div>
                                <div className="mt-2 flex">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <ServerIcon
                                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                        />
                                        <p>{car.trackerSerialNumber}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ml-5 basis-[5%]">
                            {car.expanded ? (
                                <ChevronUpIcon
                                    onClick={() => closeCar()}
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            ) : (
                                <ChevronDownIcon
                                    onClick={() => expandCar(car)}
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            )}
                        </div>
                    </div>
                    </a>
                </li>
                {car.expanded &&
                    <li className="px-20 py-10">
                        <form onSubmit={onSubmit}>
                            <input type="hidden" {...register('id')} />
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-gray-700"
                                            >
                                            Car name/model
                                            </label>
                                            <input
                                            type="text"
                                            {...register('name', { required: 'Car name is required' })}
                                            className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500
                                                        block w-full shadow-sm sm:text-sm
                                                        border-gray-300 rounded-md ${errors.name && 'border-red-500'}`}
                                            />
                                            { errors.name && <p className="text-red-500">{errors.name.message}</p> }
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                            htmlFor="last-name"
                                            className="block text-sm font-medium text-gray-700"
                                            >
                                            Plate
                                            </label>
                                            <input
                                            type="text"
                                            {...register('plate', { required: "Car plate is required" })}
                                            className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500
                                                        block w-full shadow-sm sm:text-sm
                                                        border-gray-300 rounded-md ${errors.plate && 'border-red-500'} `}
                                            />
                                            { errors.plate && <p className="text-red-500">{errors.plate.message}</p> }
                                        </div>

                                        <div className="col-span-6 sm:col-span-4">
                                            <label
                                            htmlFor="email-address"
                                            className="block text-sm font-medium text-gray-700"
                                            >
                                            Motor Tracker Serial Number
                                            </label>
                                            <input
                                            type="text"
                                            {...register('trackerSerialNumber', { required: "Tracker number is required" })}
                                            className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500
                                                        block w-full shadow-sm sm:text-sm
                                                        border-gray-300 rounded-md ${errors.trackerSerialNumber && 'border-red-500'} `}
                                            />
                                            { errors.trackerSerialNumber 
                                                && <p className="text-red-500">{errors.trackerSerialNumber.message}</p> }
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="inline-flex justify-center py-2 px-4 border
                                                border-transparent shadow-sm text-sm font-medium rounded-md
                                                text-white bg-indigo-600 hover:bg-indigo-700
                                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                    Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </li>
                }
              </React.Fragment>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Cars;
