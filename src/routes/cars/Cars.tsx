/* eslint-disable jsx-a11y/no-redundant-roles */
import { ServerIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useGetCars } from "../../hooks/cars.hooks";

type Car = {
    id: number,
    name: string,
    plate: string,
    trackerSerialNumber: string
}


const Cars = () => {
  const { data: cars } = useGetCars();

  return (
    <div
      style={{
        maxWidth: "50%",
        minWidth: "400px",
        margin: "auto",
        marginTop: "100px",
      }}
    >
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {cars && cars.map((car: Car) => (
              <li key={car.id}>
                <a href="#" className="block hover:bg-gray-50">
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
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
                    <div className="ml-5 flex-shrink-0">
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Cars;
