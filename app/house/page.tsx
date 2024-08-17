"use client";

import useStickyState from "../hooks/useStickyValue";
import { HouseConfig, HousePeriod } from "../types";
import { generateHouseBudget } from "../utils/generateHouseBudget";
import { useCallback, useEffect, useState } from "react";

function formatValue(value: number) {
  return `£${Math.round(value).toLocaleString()}`;
}

const defaultSettings = {
  houseDepositPercentage: 5,
  housePrice: 250000,
  startingBalance: 25000,
  houseValueAppreciate: 2,
  mortgageRate: 5.5,
  mortgageTerm: 25,
  salary: 3100,
  salaryIncrease: 3,
  savingsInterest: 9,
  savingsPercent: 20,
  inflation: 2,
};

export default function House() {
  const [settings, setSettings] = useStickyState<HouseConfig>(
    defaultSettings,
    "house-settings"
  );
  const [budget, setBudget] = useState<HousePeriod[]>([]);

  useEffect(() => {
    setBudget(generateHouseBudget(settings));
  }, [settings]);

  const setValue = useCallback(
    (field: string, value: number) => {
      setSettings((state) => ({
        ...state,
        [field]: value,
      }));
    },
    [setSettings]
  );

  return (
    <main className="px-12 pt-8 grid grid-cols-12  gap-x-12 justify-between">
      <div className="gap-y-8 col-span-3 flex flex-col">
        <div className="flex flex-col gap-y-2">
          <h2 className="text-gray-900 font-bold text-lg ">Salary</h2>
          <div>
            <label
              htmlFor="salary"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Monthly take home salary
            </label>
            <div className="mt-2 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                £
              </span>
              <input
                id="salary"
                name="salary"
                type="number"
                value={settings.salary}
                onChange={(e) => setValue("salary", e.target.valueAsNumber)}
                placeholder="10000"
                className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="salary-increase"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Yearly salary increases
            </label>
            <div className="mt-2 flex rounded-md shadow-sm">
              <input
                id="salary-increase"
                name="salary-increase"
                type="number"
                value={settings.salaryIncrease}
                onChange={(e) =>
                  setValue("salaryIncrease", e.target.valueAsNumber)
                }
                placeholder="5"
                className="block w-full min-w-0 flex-1 rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                %
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <h2 className="text-gray-900 font-bold text-lg ">Savings</h2>
          <div>
            <label
              htmlFor="balance"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Starting balance
            </label>
            <div className="mt-2 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                £
              </span>
              <input
                id="balance"
                name="balance"
                type="number"
                value={settings.startingBalance}
                onChange={(e) =>
                  setValue("startingBalance", e.target.valueAsNumber)
                }
                placeholder="10000"
                className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="savings-interest"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Yearly Savings Interest
            </label>
            <div className="mt-2 flex rounded-md shadow-sm">
              <input
                id="savings-interest"
                name="savings-interest"
                type="number"
                value={settings.savingsInterest}
                onChange={(e) =>
                  setValue("savingsInterest", e.target.valueAsNumber)
                }
                placeholder="5"
                className="block w-full min-w-0 flex-1 rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                %
              </span>
            </div>
          </div>
          <div>
            <label
              htmlFor="percent-save"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Percentage of earnings to save
            </label>
            <div className="mt-2 flex rounded-md shadow-sm">
              <input
                id="percent-save"
                name="percent-save"
                type="number"
                value={settings.savingsPercent}
                onChange={(e) =>
                  setValue("savingsPercent", e.target.valueAsNumber)
                }
                placeholder="5"
                className="block w-full min-w-0 flex-1 rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                %
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <h2 className="text-gray-900 font-bold text-lg ">House</h2>
          <div>
            <label
              htmlFor="house-price"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              House price
            </label>
            <div className="mt-2 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                £
              </span>
              <input
                id="house-price"
                name="house-price"
                type="number"
                value={settings.housePrice}
                onChange={(e) => setValue("housePrice", e.target.valueAsNumber)}
                placeholder="10000"
                className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="deposit"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              House deposit
            </label>
            <div className="mt-2 flex rounded-md shadow-sm">
              <input
                id="deposit"
                name="deposit"
                type="number"
                value={settings.houseDepositPercentage}
                onChange={(e) =>
                  setValue("houseDepositPercentage", e.target.valueAsNumber)
                }
                placeholder="5"
                className="block w-full min-w-0 flex-1 rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                %
              </span>
            </div>
          </div>
          <div>
            <label
              htmlFor="house-increase"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Yearly house appreciation
            </label>
            <div className="mt-2 flex rounded-md shadow-sm">
              <input
                id="house-increase"
                name="house-increase"
                type="number"
                value={settings.houseValueAppreciate}
                onChange={(e) =>
                  setValue("houseValueAppreciate", e.target.valueAsNumber)
                }
                placeholder="5"
                className="block w-full min-w-0 flex-1 rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                %
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <h2 className="text-gray-900 font-bold text-lg ">Mortgage</h2>
          <div>
            <label
              htmlFor="term"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Term length
            </label>
            <div className="mt-2 flex rounded-md shadow-sm">
              <input
                id="term"
                name="term"
                type="number"
                value={settings.mortgageTerm}
                onChange={(e) =>
                  setValue("mortgageTerm", e.target.valueAsNumber)
                }
                placeholder="5"
                className="block w-full min-w-0 flex-1 rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                years
              </span>
            </div>
          </div>
          <div>
            <label
              htmlFor="rate"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Rate
            </label>
            <div className="mt-2 flex rounded-md shadow-sm">
              <input
                id="rate"
                name="rate"
                type="number"
                value={settings.mortgageRate}
                onChange={(e) =>
                  setValue("mortgageRate", e.target.valueAsNumber)
                }
                placeholder="5"
                className="block w-full min-w-0 flex-1 rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                %
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-9 overflow-hidden shadow ring-1 ring-black ring-opacity-10 sm:rounded-lg max-h-[1000px] h-min overflow-y-scroll w-full">
        <table className="divide-y divide-gray-300 max-h-[1000px] w-full">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                scope="col"
              >
                Year
              </th>
              <th
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                Value
              </th>
              <th
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                Balance
              </th>
              <th
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                Ownership
              </th>
              <th
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                House Payments
              </th>
              <th
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                Interest Paid
              </th>
              <th
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                Monhly Salary
              </th>
              <th
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                Savings Per Month
              </th>
              <th
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                Total Savings
              </th>
              <th
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                Interest Accrued
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {budget.map((result) => {
              const paymentPercetnage =
                (result.mortgagePayment / result.salary) * 100;

              return (
                <tr
                  className="even:bg-gray-100 hover:bg-yellow-100"
                  key={result.year}
                >
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {result.year}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                    {formatValue(result.houseValue)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                    {formatValue(result.houseRemainingBalance)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                    {(
                      100 -
                      (result.houseRemainingBalance * 100) / result.houseValue
                    ).toFixed(1)}
                    %
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                    <div className="flex gap-x-2 items-end">
                      <span
                        className={`${
                          paymentPercetnage > 30
                            ? "text-red-800 font-bold"
                            : "text-gray-600"
                        }`}
                      >
                        {formatValue(result.mortgagePayment)}
                      </span>
                      <span
                        className={`text-xs ${
                          paymentPercetnage > 30
                            ? "text-red-800 font-bold"
                            : "text-gray-400"
                        }`}
                      >
                        {paymentPercetnage.toPrecision(3)}%
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                    {formatValue(result.interestPaid)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                    <div className="flex gap-x-2 items-end">
                      <span className="font-bold">
                        {formatValue(result.salary)}
                      </span>
                      <span className="text-xs text-gray-400">
                        {formatValue(
                          result.salary -
                            result.mortgagePayment -
                            result.salary * (settings.savingsPercent / 100)
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                    {formatValue(
                      result.salary * (settings.savingsPercent / 100)
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                    <div className="flex gap-x-2 items-end">
                      <span className="font-bold">
                        {formatValue(result.savings)}
                      </span>
                      <span className="text-xs text-gray-400">
                        {formatValue(result.realTermsSavings)}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                    {formatValue(result.savingsInterestAccrued)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
