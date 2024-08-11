"use client";

import { generateBudgetOutput } from "../utils/generateBudgetOutput";
import { DateTime } from "luxon";
import clsx from "classnames";

function formatAmount(value: number) {
  if (Number.isInteger(value)) {
    return `£${value}`;
  } else {
    return `£${value.toFixed(0)}`;
  }
}
export default function () {
  const budget = generateBudgetOutput(
    {
      debt: [
        {
          amount: 450,
          name: "Monzo",
          startingAmount: 6826,
        },
        {
          amount: 50,
          name: "Phone",
          startingAmount: 550,
        },
      ],
      expenses: [
        {
          amount: 1250,
          name: "Rent",
          yearlyIncrease: 0.02,
        },
        {
          amount: 150,
          name: "Parking",
          yearlyIncrease: 0,
        },
        {
          amount: 110,
          name: "Council Tax",
          yearlyIncrease: 0.03,
        },
        {
          amount: 28,
          name: "Water",
          yearlyIncrease: 0.03,
        },
        {
          amount: 100,
          name: "Energy",
          yearlyIncrease: 0.03,
        },
        {
          amount: 91,
          name: "Car Insurance",
          yearlyIncrease: -0.2,
        },
        {
          amount: 30,
          name: "Subscriptions",
          yearlyIncrease: 0.03,
        },
        {
          amount: 700,
          name: "General",
          yearlyIncrease: 0.03,
        },
        {
          amount: 38,
          name: "Internet",
          yearlyIncrease: 0.02,
        },
      ],
      savings: [
        {
          amount: 1200,
          name: "Easy Access",
          startingAmount: 11000,
          yearlyIncrease: 0.05,
          yearlyInterest: 0.045,
        },
      ],
      income: [
        {
          amount: 4357,
          name: "Salary",
          yearlyIncrease: 0.05,
        },
      ],
      inflation: 0,
      oneOffExpenses: [],
    },
    24
  );

  return (
    <table className="divide-y divide-gray-400 mx-auto overflow-x-scroll max-w-[1200px]">
      <thead>
        <tr>
          <th className="border-2 border-stone-800"></th>
          {budget.map((month) => (
            <th className="py-2 px-4 text-left  font-semibold text-stone-800 border-2 border-stone-800 even:bg-gray-100">
              {month.date.toFormat("MMM yyyy")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {/* Income */}
        {budget[0].income.breakdown.map((income, index) => (
          <tr>
            <td className="border py-2 px-4 even:bg-emerald-50 odd:bg-emerald-100 font-semibold text-stone-800 border-x-2 border-x-stone-800">
              {income.name}
            </td>
            {budget.map((month) => (
              <td className="border py-2 px-4 even:bg-emerald-50 odd:bg-emerald-100 border-x-2 border-x-stone-800">
                {formatAmount(month.income.breakdown[index].amount)}
              </td>
            ))}
          </tr>
        ))}
        <tr>
          <td className="border py-2 px-4 even:bg-emerald-300 odd:bg-emerald-500 font-semibold text-stone-800 border-y-2 border-y-stone-700 border-x-2 border-x-stone-800">
            Total
          </td>
          {budget.map((month) => (
            <td className="py-2 px-4 even:bg-emerald-300 odd:bg-emerald-500 border border-y-2 border-y-stone-700 font-semibold border-x-2 border-x-stone-800">
              {formatAmount(month.income.total)}
            </td>
          ))}
        </tr>
        {/* Expenses */}
        {budget[0].expenses.breakdown.map((expense, index) => (
          <tr>
            <td className="border py-2 px-4  font-semibold text-stone-800 even:bg-red-50 odd:bg-red-100 border-x-2 border-x-stone-800">
              {expense.name}
            </td>
            {budget.map((month) => (
              <td className="border py-2 px-4 even:bg-red-50 odd:bg-red-100 border-x-2 border-x-stone-800">
                {formatAmount(month.expenses.breakdown[index].amount)}
              </td>
            ))}
          </tr>
        ))}
        <tr>
          <td className="border py-2 px-4 even:bg-red-50 odd:bg-red-100 border-x-2 border-x-stone-800 font-semibold">
            One offs
          </td>
          {budget.map((month) => (
            <td className="border py-2 px-4 even:bg-red-50 odd:bg-red-100 border-x-2 border-x-stone-800">
              {formatAmount(0)}
            </td>
          ))}
        </tr>
        <tr>
          <td className="border py-2 px-4 even:bg-red-300 odd:bg-red-500 font-semibold text-stone-800 border-y-2 border-y-stone-700 border-x-2 border-x-stone-800">
            Total
          </td>
          {budget.map((month) => (
            <td className="border py-2 px-4 even:bg-red-300 odd:bg-red-500 border-y-2 border-y-stone-700 font-semibold border-x-2 border-x-stone-800">
              ({formatAmount(month.expenses.total)})
            </td>
          ))}
        </tr>

        {/* Debts */}
        {budget[0].debt.breakdown.map((debt, index) => (
          <tr>
            <td className="border py-2 px-4  font-semibold text-stone-800 even:bg-orange-50 odd:bg-orange-100 border-x-2 border-x-stone-800">
              {debt.name}
            </td>
            {budget.map((month) => (
              <td className="border py-2 px-4 even:bg-orange-50 odd:bg-orange-100 border-x-2 border-x-stone-800">
                {formatAmount(month.debt.breakdown[index].amount)}
              </td>
            ))}
          </tr>
        ))}
        <tr>
          <td className="border py-2 px-4 even:bg-orange-300 odd:bg-orange-500 font-semibold text-stone-800 border-y-2 border-y-stone-700 border-x-2 border-x-stone-800">
            Total
          </td>
          {budget.map((month) => (
            <td className="border py-2 px-4 even:bg-orange-300 odd:bg-orange-500 border-y-2 border-y-stone-700 font-semibold border-x-2 border-x-stone-800">
              ({formatAmount(month.debt.total)})
            </td>
          ))}
        </tr>
        {/* Savings */}
        {budget[0].savings.breakdown.map((savings, index) => (
          <tr>
            <td className="border py-2 px-4  font-semibold text-stone-800 even:bg-teal-50 odd:bg-teal-100 border-x-2 border-x-stone-800">
              {savings.name}
            </td>
            {budget.map((month) => (
              <td className="border py-2 px-4 even:bg-teal-50 odd:bg-teal-100 border-x-2 border-x-stone-800">
                <div className="flex flex-col gap-y-2">
                  <span>
                    ({formatAmount(month.savings.breakdown[index].amount)})
                  </span>
                  <span className="text-xs text-gray-700 flex flex-col gap-y-2">
                    {formatAmount(month.savings.breakdown[index].total)}
                  </span>
                  {month.savings.breakdown[index].interest > 0 && (
                    <span className="text-xs text-gray-700">
                      Interest accured{" "}
                      {formatAmount(month.savings.breakdown[index].interest)}
                    </span>
                  )}
                </div>
              </td>
            ))}
          </tr>
        ))}

        <tr>
          <td className="border py-2 px-4  font-semibold text-stone-800 even:bg-teal-50 odd:bg-teal-100 border-x-2 border-x-stone-800">
            Leftovers
          </td>
          {budget.map((month) => (
            <td className="border py-2 px-4 even:bg-teal-50 odd:bg-teal-100 border-x-2 border-x-stone-800">
              <div className="flex flex-col gap-y-2">
                <span>{formatAmount(month.leftOver)}</span>
                <span className="text-xs text-gray-700">
                  {formatAmount(month.totalLeftOver)}
                </span>
              </div>
            </td>
          ))}
        </tr>
        <tr>
          <td className="border py-2 px-4 even:bg-teal-300 odd:bg-teal-500 font-semibold text-stone-800 border-y-2 border-y-stone-700 border-x-2 border-x-stone-800">
            Total
          </td>
          {budget.map((month) => (
            <td className="border py-2 px-4 even:bg-teal-300 odd:bg-teal-500 border-y-2 border-y-stone-700 font-semibold border-x-2 border-x-stone-800">
              <div className="flex flex-col gap-y-2">
                <span>
                  {formatAmount(month.savings.total + month.leftOver)}
                </span>
                <span className="text-xs text-gray-700">
                  {formatAmount(
                    month.totalLeftOver +
                      month.savings.breakdown.reduce((a, b) => a + b.total, 0)
                  )}
                </span>
              </div>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
