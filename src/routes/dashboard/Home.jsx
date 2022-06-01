import React, { useState, useEffect } from "react";
import HistoryTable from "./HistoryTable";
import Dropdown from "../../components/Dropdown";

import * as api from "../../components/apiService";

function Home() {
  const [cars, setCars] = useState([]);
  const [carStats, setCarStats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    findCars();
  }, []);

  const findCars = async () => {
    try {
      setLoading(true);

      const { data } = await api.findCars();

      setCars(data);

      if (data.length > 0) {
        const response = await api.findCarStats(data[0]);

        setCarStats(response.data);
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const findCarStats = async (car) => {
    try {
      const { data } = await api.findCarStats(car);

      setCarStats(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div style={{ width: "90%", margin: "auto", marginTop: "50px" }}>
        {cars.length > 0 ? (
          <>
            <div style={{ marginBottom: "20px", textAlign: "right" }}>
              <Dropdown cars={cars} handleSelectedCar={findCarStats} />
            </div>
            <HistoryTable carStats={carStats} />
          </>
        ) : !loading ? (
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
