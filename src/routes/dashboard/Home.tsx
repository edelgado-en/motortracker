import React, { useState, useEffect } from "react";
import HistoryTable from "./HistoryTable";
import Dropdown from "../../components/Dropdown";
import * as api from "../../components/apiService";
import { useGetCars, ServerStateKeyEnum } from "../../hooks/cars.hooks";
import { useQuery } from "react-query";

import Pagination from "react-js-pagination";

const ITEMS_PER_PAGE = 20;

const Home = () => {
  const { data: cars, isLoading } = useGetCars();
  const [page, setPage] = useState(0);
  const [car, setCar] = useState(null);

  const [tempSelected, setTempSelected ] = useState(true);
  const [pressureSelected, setPressureSelected ] = useState(false);
  const [airFuelSelected, setAirFuelSelected ] = useState(false);
  const [voltageSelected, setVoltageSelected ] = useState(false);

    useEffect(() => {
        if (cars) {
            setCar(cars[0]);
        }
    }, [cars]);

  const { data: carStats } = useQuery(
    [ServerStateKeyEnum.CarStats, car, page],
    async () => {
        if (car) {
            const { data } = await api.findCarStats(car, page, ITEMS_PER_PAGE);

            return data;
        }
    },
    {
      enabled: !isLoading,
    }
  );

  const findCarStats = (selectedCar: any) => {
    setCar(selectedCar);
  }

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  }

  const handleStatsButton = (stat: string) => {
    setTempSelected(false);
    setPressureSelected(false);
    setAirFuelSelected(false);
    setVoltageSelected(false);

    if (stat === 'temp') {
        setTempSelected(true);
    } else if (stat === 'pressure') {
        setPressureSelected(true);
    } else if (stat === 'airFuel') {
        setAirFuelSelected(true);
    } else if (stat === 'voltage') {
        setVoltageSelected(true);
    }
  }
 
  return (
    <>
      <div className="m-auto w-11/12 mt-12">
        {cars && cars.length > 0 ? (
          <React.Fragment>
            <div className="mb-5 text-right">
              <Dropdown cars={cars} handleSelectedCar={findCarStats} /> 
            </div>

            {(carStats && carStats.content.length > 0) ? (
                <>
                    <div className="flex max-w-screen-md m-auto justify-center mb-7 mt-7">
                        <button
                            onClick={() => handleStatsButton('temp')}
                            type="button"
                            className={`inline-flex items-center px-6 py-3 border
                                        text-sm font-medium
                                        rounded-full shadow-sm
                                        ${tempSelected ? 'text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 border-transparent' 
                                                       : 'text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}
                                        `}
                        >
                            Temp
                        </button>
                        <button
                            onClick={() => handleStatsButton('pressure')}
                            type="button"
                            className={`ml-5 text-sm font-medium inline-flex items-center px-6 py-3 border
                                        rounded-full shadow-sm
                                        ${pressureSelected ? 'text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 border-transparent' 
                                                       : 'text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}
                                        `}
                        >
                            Pressure
                        </button>
                        <button
                            onClick={() => handleStatsButton('airFuel')}
                            type="button"
                            className={`ml-5 inline-flex items-center px-6 py-3 border
                                        text-sm font-medium
                                        rounded-full shadow-sm
                                        ${airFuelSelected ? 'text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 border-transparent' 
                                                       : 'text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}
                                        `}
                        >
                            AirFuel
                        </button>
                        <button
                            onClick={() => handleStatsButton('voltage')}
                            type="button"
                            className={`ml-5 inline-flex items-center px-6 py-3 border
                                        text-sm font-medium
                                        rounded-full shadow-sm
                                        ${voltageSelected ? 'text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 border-transparent' 
                                                       : 'text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}
                                        `}
                        >
                            Voltage
                        </button>
                    </div>
                    
                    <HistoryTable 
                        carStats={carStats.content}
                        tempSelected={tempSelected}
                        pressureSelected={pressureSelected}
                        airFuelSelected={airFuelSelected}
                        voltageSelected={voltageSelected}
                     />
                    
                    {carStats.totalElements > ITEMS_PER_PAGE && 
                        <Pagination
                            activePage={page}
                            itemsCountPerPage={ITEMS_PER_PAGE}
                            totalItemsCount={carStats.totalElements}
                            pageRangeDisplayed={4}
                            onChange={handlePageChange}
                            innerClass="bg-white px-4 py-3 flex border-t border-gray-200 sm:px-6 m-auto max-w-screen-md"
                            activeClass="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                            itemClass="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        />
                    }
                </>
            ) : (
                <div className="text-center mt-24">
                    <h1>No statistics collected for this car.</h1>
                    <h1>Make sure your tracker is properly connected.</h1>
                </div>   
            )} 

          </React.Fragment>
        ) : !isLoading ? (
          <div
            style={{
              margin: "auto",
              width: "80%",
              textAlign: "center",
              marginTop: "250px",
            }}
          >
            No registered cars found. Go to the Register Car tab to register a
            car.
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Home;
