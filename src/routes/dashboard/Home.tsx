import React, { useState, useEffect } from "react";
import HistoryTable from "./HistoryTable";
import Dropdown from "../../components/Dropdown";
import * as api from "../../components/apiService";
import { useGetCars } from "../../hooks/cars.hooks";
import { useQuery } from "react-query";

import Pagination from "react-js-pagination";

let car: any = null;

function Home() {
  const { data: cars, isLoading } = useGetCars();
  const [page, setPage] = useState(0);
  
  //TODO: this is temporary because useGetCars will return an object with the totalCars and the array of cars
  // const enabledStatsCall = data?.cars  //and the in enabled: !!enabledStatsCall
  if (cars) {
    car = cars[0]
  }

  const { data: carStats, refetch } = useQuery(
    ["carStats", car, page],
    async () => {
      const { data } = await api.findCarStats(car, page);
      console.log(data);
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
    console.log(pageNumber);
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
                <div>
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={5}
                        totalItemsCount={carStats.totalElements}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
                    />
                </div>
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
