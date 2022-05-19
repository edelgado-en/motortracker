import React, { useState } from 'react'
import * as api from './apiService';

const RegisterCar = () => {
    const [carName, setCarName] = useState('');
    const [carPlate, setCarPlate] = useState('');
    const [trackerSerialNumber, setTrackerSerialNumber] = useState('');

    const onSubmit = async (e) => {
      e.preventDefault();

      const requestObject = {
        name: carName,
        plate: carPlate,
        trackerSerialNumber: trackerSerialNumber
      }

      try {
        await api.registerCar(requestObject);
          
        setCarName('');
        setCarPlate('');
        setTrackerSerialNumber('');

      } catch (err) {
        console.log(err);
      }
    }

  return (
    <div className="mt-10 sm:mt-0" style={{ margin: '70px' }}>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Car Information</h3>
              <p className="mt-1 text-sm text-gray-600">Get the serial number from the back of your tracker.</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST" onSubmit={onSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Car name/model
                      </label>
                      <input
                        type="text"
                        value={carName}
                        onChange={(e) => setCarName(e.target.value)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Plate
                      </label>
                      <input
                        type="text"
                        value={carPlate}
                        onChange={(e) => setCarPlate(e.target.value)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Motor Tracker Serial Number
                      </label>
                      <input
                        type="text"
                        value={trackerSerialNumber}
                        onChange={(e) => setTrackerSerialNumber(e.target.value)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    disabled={carName.length === 0
                               || carPlate.length === 0
                               || trackerSerialNumber.length === 0}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

  )
}

export default RegisterCar;