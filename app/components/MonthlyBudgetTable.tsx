"use client";

import { DateTime } from "luxon";
import { useFinanceStore } from "../store/useBudgetStore";
import { BudgetPeriod } from "../types";
import { generateBudget } from "../utils/generateBudgetOutput";

function formatValue(value: number) {
  return `£${Math.round(value).toLocaleString()}`;
}

type MonthlyBudgetTableProps = {
  budget?: BudgetPeriod[];
};
function MonthlyBudgetTable() {
  const { income, savings, debt, expenses } = useFinanceStore();

  const budget = generateBudget(
    {
      debt,
      expenses,
      income,
      oneOffs: [],
      meta: {
        netRemaining: {
          name: "ISA",
          type: "savings",
        },
      },
      savings,
    },
    DateTime.now(),
    20
  );
  return (
    <table className="divide-y divide-stone-300 w-full border-stone-600 border rounded-md border-separate">
      <thead className="sticky top-0 z-10">
        <tr className="text-stone-200">
          <th className="py-3.5 pl-4 pr-3 text-left" scope="col">
            Year
          </th>

          <th className="px-3 py-3.5 text-left" scope="col">
            Income
          </th>
          <th className="px-3 py-3.5 text-left" scope="col">
            Expenses
          </th>
          <th className="px-3 py-3.5 text-left" scope="col">
            Debt
          </th>
          <th className="px-3 py-3.5 text-left" scope="col">
            Remaining Debt
          </th>
          <th className="px-3 py-3.5 text-left" scope="col">
            Savings
          </th>
          <th className="px-3 py-3.5 text-left" scope="col">
            Total Savings
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
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
            <tr className="hover:bg-stone-500" key={result.date.toString()}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-stone-200 sm:pl-6">
                {result.date.toFormat("LLL yyyy")}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-stone-200">
                {formatValue(result.income.total)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-stone-200">
                <div className="flex gap-x-2 items-end">
                  <span>{formatValue(result.expenses.total)}</span>
                  <span className="text-xs text-stone-300">
                    {expensePercent}%
                  </span>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-stone-200">
                <div className="flex flex-col gap-y-1">
                  <div className="flex gap-x-2 items-end">
                    <span>{formatValue(result.debt.total)}</span>
                    <span className="text-xs text-stone-300">
                      {debtPercent}%
                    </span>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-stone-200 font-bold">
                {formatValue(result.debt.totalBalance)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-stone-200">
                <div className="flex gap-x-2 items-end">
                  <span>{formatValue(result.savings.total)}</span>
                  <span className="text-xs text-stone-300">
                    {savingsPercent}%
                  </span>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-stone-200 font-bold">
                {formatValue(result.savings.totalBalance)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default MonthlyBudgetTable;
