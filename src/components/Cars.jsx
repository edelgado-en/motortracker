import { useEffect, useState } from 'react';
import * as api from './apiService';
import { ServerIcon, ChevronRightIcon } from '@heroicons/react/solid'

export default function Example() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        getCars();
    }, []);

    const getCars = async () => {
        try {
            const { data } = await api.findCars();
            setCars(data);
        
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <div style={{ maxWidth:'50%', minWidth: '400px', margin: 'auto', marginTop: '100px' }}>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {cars.map((car) => (
                    <li key={car.id}>
                        <a href="#" className="block hover:bg-gray-50">
                        <div className="px-4 py-4 flex items-center sm:px-6">
                            <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                <div className="truncate">
                                    <div className="flex text-sm">
                                        <p className="font-medium text-indigo-600 truncate">{car.name}</p>
                                        <p className="ml-1 flex-shrink-0 font-normal text-gray-500">{car.plate}</p>
                                    </div>
                                    <div className="mt-2 flex">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <ServerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                            <p>
                                                {car.trackerSerialNumber}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ml-5 flex-shrink-0">
                                <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                        </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}