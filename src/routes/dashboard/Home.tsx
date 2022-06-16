import React, { useState, useEffect } from "react";
import HistoryTable from "./HistoryTable";
import Dropdown from "../../components/Dropdown";
import * as api from "../../components/apiService";
import { useGetCars, ServerStateKeyEnum } from "../../hooks/cars.hooks";
import { useQuery } from "react-query";

import Pagination from "react-js-pagination";

let car: any = null;

const ITEMS_PER_PAGE = 10;

function Home() {
  const { data: cars, isLoading } = useGetCars();
  const [page, setPage] = useState(0);
  
  if (cars) {
    car = cars[0]
  }

  const { data: carStats, refetch } = useQuery(
    [ServerStateKeyEnum.CarStats, car, page],
    async () => {
      const { data } = await api.findCarStats(car, page);
      
      return data;
    },
    {
      enabled: !isLoading,
    }
  );

  const findCarStats = (selectedCar: any) => {
    car = selectedCar;

    refetch();
  }

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  }
 
  return (
    <>
      <div className="m-auto w-11/12 mt-12">
        {cars && cars.length > 0 ? (
          <React.Fragment>
            <div className="mb-5 text-right">
              <Dropdown cars={cars} handleSelectedCar={findCarStats} /> 
            </div>

            {carStats && 
                <>
                    <HistoryTable carStats={carStats.content} />
                    
                    {carStats.totalElements > ITEMS_PER_PAGE && 
                        <Pagination
                            activePage={page}
                            itemsCountPerPage={ITEMS_PER_PAGE}
                            totalItemsCount={carStats.totalElements}
                            pageRangeDisplayed={4}
                            onChange={handlePageChange}
                            innerClass="w-1/4 bg-white px-4 py-3 flex items-center border-t border-gray-200 sm:px-6 m-auto"
                            activeClass="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                            itemClass="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        />
                    }
                </>
            } 

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
