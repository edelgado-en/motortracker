export default function HistoryTable({
  carStats,
  tempSelected,
  pressureSelected,
  airFuelSelected,
}) {
  return (
    <div className="flex flex-col max-w-screen-md m-auto">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            {carStats.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    {tempSelected && (
                      <>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Coolant
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Oil
                        </th>
                      </>
                    )}

                    {pressureSelected && (
                      <>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Boost
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Oil
                        </th>
                      </>
                    )}

                    {airFuelSelected && (
                      <>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          AirFuel
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {carStats.map((stat) => (
                    <tr key={stat.id}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {stat.timeStamp}
                      </td>
                      {tempSelected && (
                        <>
                          <td
                            className={`px-4 py-4 whitespace-nowrap text-sm text-gray-500 ${
                              stat.coolantThreshold.danger
                                ? "bg-red-100"
                                : stat.coolantThreshold.warning
                                ? "bg-yellow-100"
                                : ""
                            }`}
                          >
                            {stat.coolant}
                          </td>
                          <td
                            className={`px-4 py-4 whitespace-nowrap text-sm text-gray-500 ${
                              stat.oilTempThreshold.danger
                                ? "bg-red-200"
                                : stat.oilTempThreshold.warning
                                ? "bg-yellow-200"
                                : ""
                            }`}
                          >
                            {stat.oilTemp}
                          </td>
                        </>
                      )}

                      {pressureSelected && (
                        <>
                          <td
                            className={`px-4 py-4 whitespace-nowrap text-sm text-gray-500 ${
                              stat.boostPressureThreshold.danger
                                ? "bg-red-200"
                                : stat.boostPressureThreshold.warning
                                ? "bg-yellow-200"
                                : ""
                            }`}
                          >
                            {stat.boostPressure}
                          </td>
                          <td
                            className={`px-4 py-4 whitespace-nowrap text-sm text-gray-500 ${
                              stat.oilPressureThreshold.danger
                                ? "bg-red-200"
                                : stat.oilPressureThreshold.warning
                                ? "bg-yellow-200"
                                : ""
                            }`}
                          >
                            {stat.oilPressure}
                          </td>
                        </>
                      )}

                      {airFuelSelected && (
                        <>
                          <td
                            className={`px-4 py-4 whitespace-nowrap text-sm text-gray-500 ${
                              stat.airFuelRatioThreshold.danger
                                ? "bg-red-200"
                                : stat.airFuelRatioThreshold.warning
                                ? "bg-yellow-200"
                                : ""
                            }`}
                          >
                            {stat.airFuelRatio}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div
                style={{
                  margin: "auto",
                  width: "80%",
                  textAlign: "center",
                  marginTop: "150px",
                }}
              >
                No data collected
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
