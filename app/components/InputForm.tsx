"use client";

import { generateBudget } from "../utils/generateBudgetOutput";

import { DateTime, Duration } from "luxon";

function formatValue(value: number) {
  return `£${Math.round(value).toLocaleString()}`;
}

function InputForm() {
  const budget = generateBudget(
    {
      oneOffs: [
        {
          amount: 2000,
          name: "Bonus",
          type: "income",
          date: {
            month: 12,
            year: 2024,
          },
        },
        {
          amount: 260,
          name: "Pokemon cards",
          type: "income",
          date: {
            month: 8,
            year: 2024,
          },
        },
        {
          amount: 725,
          name: "Dentist",
          type: "expense",
          date: {
            month: 8,
            year: 2024,
          },
        },
        {
          amount: 520,
          name: "Car",
          type: "expense",
          date: {
            month: 8,
            year: 2024,
          },
        },
        {
          amount: 400,
          name: "Willow's Present",
          type: "expense",
          date: {
            month: 10,
            year: 2024,
          },
        },
        {
          amount: 400,
          name: "Christmas",
          type: "expense",
          date: {
            month: 12,
            year: 2024,
          },
        },
      ],
      meta: {
        netRemaining: {
          name: "ISA",
          type: "savings",
        },
      },
      income: [
        {
          amount: 4357,
          name: "Salary",
          increasePerAnnum: 5,
        },
      ],
      expenses: [
        {
          amount: 1250,
          name: "Rent",
          increasePerAnnum: 2,
        },
        {
          amount: 150,
          name: "Parking",
          increasePerAnnum: 0,
        },
        {
          amount: 110,
          name: "Council Tax",
          increasePerAnnum: 3,
        },
        {
          amount: 28,
          name: "Water",
          increasePerAnnum: 3,
        },
        {
          amount: 110,
          name: "Energy",
          increasePerAnnum: 3,
        },
        {
          amount: 91,
          name: "Car Insurance",
          increasePerAnnum: -20,
        },
        {
          amount: 50,
          name: "Subscriptions",
          increasePerAnnum: 3,
        },
        {
          amount: 800,
          name: "General",
          increasePerAnnum: 3,
        },
        {
          amount: 38,
          name: "Internet",
          increasePerAnnum: 2,
        },
      ],
      debt: [
        {
          amount: 500,
          increasePerAnnum: 0,
          name: "Monzo Loan",
          startingBalance: 6750,
        },
        {
          amount: 50,
          increasePerAnnum: 0,
          name: "Phone Loan",
          startingBalance: 500,
        },
      ],
      savings: [
        {
          amount: 300,
          annualInterest: 9,
          increasePerAnnum: 5,
          interestPaid: "monthly",
          name: "ISA",
          startingBalance: 300,
        },
        {
          amount: 0,
          annualInterest: 4.4,
          increasePerAnnum: 5,
          interestPaid: "monthly",
          name: "Pot",
          startingBalance: 10480,
        },
      ],
    },
    DateTime.now(),
    20
  );

  return (
    <div className="col-span-9 overflow-hidden shadow ring-1 ring-black ring-opacity-10 sm:rounded-lg max-h-[500px] overflow-y-scroll w-full">
      <table className="divide-y divide-gray-300 w-full">
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
              Income
            </th>
            <th
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              scope="col"
            >
              Expenses
            </th>
            <th
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              scope="col"
            >
              Debt
            </th>
            <th
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              scope="col"
            >
              Remaining Debt
            </th>
            <th
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              scope="col"
            >
              Savings
            </th>
            <th
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              scope="col"
            >
              Total Savings
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {budget.map((result) => {
            const expensePercent = (
              (result.expenses.total / result.income.total) *
              100
            ).toPrecision(3);

            const debtPercent = (
              (result.debt.total / result.income.total) *
              100
            ).toPrecision(3);

            const savingsPercent = (
              (result.savings.total / result.income.total) *
              100
            ).toPrecision(3);
            return (
              <tr
                className="even:bg-gray-100 hover:bg-yellow-100"
                key={result.date.toFormat("dd-mm-yyyy")}
              >
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {result.date.monthLong} {result.date.year}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                  {formatValue(result.income.total)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                  <div className="flex gap-x-2 items-end">
                    <span>{formatValue(result.expenses.total)}</span>
                    <span className="text-xs text-gray-400">
                      {expensePercent}%
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                  <div className="flex flex-col gap-y-1">
                    <div className="flex gap-x-2 items-end">
                      <span>{formatValue(result.debt.total)}</span>
                      <span className="text-xs text-gray-400">
                        {debtPercent}%
                      </span>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 font-bold">
                  {formatValue(result.debt.totalBalance)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                  <div className="flex gap-x-2 items-end">
                    <span>{formatValue(result.savings.total)}</span>
                    <span className="text-xs text-gray-400">
                      {savingsPercent}%
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 font-bold">
                  {formatValue(result.savings.totalBalance)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default InputForm;
