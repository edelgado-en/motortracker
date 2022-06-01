import { useForm } from "react-hook-form";
import { useRegisterCar } from "../../hooks/cars.hooks";

export type FormValues = {
    name: string,
    plate: string,
    trackerSerialNumber: string
}

const RegisterCar: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
    const { mutate, isLoading } = useRegisterCar(reset);

    const onSubmit = handleSubmit((data: any) => {
        mutate(data)
    })

  return (
    <div className="mt-10 sm:mt-0" style={{ margin: "70px" }}>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Car Information
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Get the serial number from the back of your tracker.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={onSubmit}>
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
                    { errors.trackerSerialNumber && <p className="text-red-500">{errors.trackerSerialNumber.message}</p> }
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
        </div>
      </div>
    </div>
  );
};

export default RegisterCar;
