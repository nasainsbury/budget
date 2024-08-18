"use client";

import { useCallback, useEffect, useState } from "react";
import { BudgetConfig } from "../types";
import useStickyState from "../hooks/useStickyValue";

type MonthlyBudgetFormProps = {
  onChange: (config: BudgetConfig) => void;
};

function MonthlyBudgetForm(props: MonthlyBudgetFormProps) {
  const [config, setConfig] = useStickyState<BudgetConfig>(
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
    "monthly-config"
  );

  useEffect(() => {
    props.onChange(config);
  }, [config]);

  const addRow = useCallback(
    (type: "debt" | "expenses" | "savings" | "income") => {
      if (type === "income") {
        setConfig((config) => {
          const updatedIncome = [
            ...config.income,
            { name: "", amount: 0, increasePerAnnum: 0 },
          ];
          return { ...config, income: updatedIncome };
        });
      }

      if (type === "expenses") {
        setConfig((config) => {
          const updatedExpense = [
            ...config.expenses,
            { name: "", amount: 0, increasePerAnnum: 0 },
          ];
          return { ...config, expenses: updatedExpense };
        });
      }
    },
    []
  );
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2 w-2/3">
        <div className="flex gap-x-4 items-center">
          <h2 className="text-gray-950 font-semibold text-lg">Income</h2>
          <button
            onClick={() => addRow("income")}
            className="bg-green-800 text-white rounded-md px-4 py-2 self-center h-auto"
          >
            +
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Yearly Increase</th>
            </tr>
          </thead>
          <tbody>
            {config.income.map((income, index) => (
              <MonthlyIncome
                name={income.name}
                amount={income.amount}
                yearlyIncrease={income.increasePerAnnum}
                onDelete={() => {
                  setConfig((config) => {
                    const updatedIncome = config.income.filter(
                      (_, i) => i !== index
                    );
                    return { ...config, income: updatedIncome };
                  });
                }}
                onChange={(key, value) => {
                  setConfig((prevConfig) => {
                    const updatedIncome = [...prevConfig.income];
                    updatedIncome[index] = {
                      ...updatedIncome[index],
                      [key]: value,
                    };
                    return { ...prevConfig, income: updatedIncome };
                  });
                }}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-y-2 w-2/3">
        <div className="flex gap-x-4 items-center">
          <h2 className="text-gray-950 font-semibold text-lg">Expenses</h2>
          <button
            onClick={() => addRow("expenses")}
            className="bg-green-800 text-white rounded-md px-4 py-2 self-center h-auto"
          >
            +
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Yearly Increase</th>
            </tr>
          </thead>
          <tbody>
            {config.expenses.map((expense, index) => (
              <MonthlyIncome
                name={expense.name}
                amount={expense.amount}
                yearlyIncrease={expense.increasePerAnnum}
                onDelete={() => {
                  setConfig((config) => {
                    const updated = config.expenses.filter(
                      (_, i) => i !== index
                    );
                    return { ...config, expenses: updated };
                  });
                }}
                onChange={(key, value) => {
                  setConfig((prevConfig) => {
                    const updated = [...prevConfig.expenses];
                    updated[index] = {
                      ...updated[index],
                      [key]: value,
                    };
                    return { ...prevConfig, expenses: updated };
                  });
                }}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-y-2 w-2/3">
        <div className="flex gap-x-4 items-center">
          <h2 className="text-gray-950 font-semibold text-lg">Savings</h2>
          <button
            onClick={() => addRow("expenses")}
            className="bg-green-800 text-white rounded-md px-4 py-2 self-center h-auto"
          >
            +
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Balance</th>
              <th>Amount</th>
              <th>Yearly Increase</th>
              <th>Annual Interest</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {config.savings.map((savings, index) => (
              <Savings
                name={savings.name}
                amount={savings.amount}
                yearlyIncrease={savings.increasePerAnnum}
                annualInterest={savings.annualInterest}
                startingBalance={savings.startingBalance}
                interestPaid={savings.interestPaid}
                onDelete={() => {
                  setConfig((config) => {
                    const updatedExpense = config.expenses.filter(
                      (_, i) => i !== index
                    );
                    return { ...config, expenses: updatedExpense };
                  });
                }}
                onChange={(key, value) => {
                  setConfig((prevConfig) => {
                    const updatedExpenses = [...prevConfig.expenses];
                    updatedExpenses[index] = {
                      ...updatedExpenses[index],
                      [key]: value,
                    };
                    return { ...prevConfig, expenses: updatedExpenses };
                  });
                }}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Savings</h2>
      </div>
    </div>
  );
}

type MonthlyIncomeProps = {
  name: string;
  amount: number;
  yearlyIncrease: number;
  onChange: (key: string, value: string | number) => void;
  onDelete: () => void;
};

function MonthlyIncome(props: MonthlyIncomeProps) {
  return (
    <tr>
      <td className="px-4 py-2">
        <div className="flex rounded-md shadow-sm">
          <input
            id="name"
            name="name"
            type="string"
            value={props.name}
            onChange={(e) => props.onChange("name", e.target.value)}
            placeholder=""
            className="block w-full min-w-0 flex-1 px-3 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </td>
      <td className="px-4 py-2">
        <div className="flex rounded-md shadow-sm">
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
            £
          </span>
          <input
            id="amount"
            name="amount"
            type="number"
            value={props.amount}
            onChange={(e) => props.onChange("amount", e.target.valueAsNumber)}
            placeholder="2000"
            className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </td>
      <td className="px-4 py-2">
        <div className="flex rounded-md shadow-sm">
          <input
            id="yearly-increase"
            name="yearly-increase"
            type="number"
            value={props.yearlyIncrease}
            onChange={(e) =>
              props.onChange("increasePerAnnum", e.target.valueAsNumber)
            }
            placeholder="5"
            className="block w-full min-w-0 flex-1 rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
            %
          </span>
        </div>
      </td>
      <td className="px-4 py-2">
        <button
          onClick={props.onDelete}
          className="self-end rounded-md bg-red-900 text-gray-200 px-3 py-1.5"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

type SavingsProps = {
  name: string;
  amount: number;
  yearlyIncrease: number;
  annualInterest: number;
  interestPaid: "monthly" | "yearly";
  startingBalance: number;
  onChange: (key: string, value: string | number) => void;
  onDelete: () => void;
};

function Savings(props: SavingsProps) {
  return (
    <tr>
      <td className="px-4 py-2">
        <div className="flex rounded-md shadow-sm">
          <input
            id="name"
            name="name"
            type="string"
            value={props.name}
            onChange={(e) => props.onChange("name", e.target.value)}
            placeholder=""
            className="block w-full min-w-0 flex-1 px-3 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </td>
      <td className="px-4 py-2">
        <div className="flex rounded-md shadow-sm">
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
            £
          </span>
          <input
            id="starting-balance"
            name="starting-balance"
            type="number"
            value={props.startingBalance}
            onChange={(e) =>
              props.onChange("startingBalance", e.target.valueAsNumber)
            }
            placeholder="2000"
            className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </td>
      <td className="px-4 py-2">
        <div className="flex rounded-md shadow-sm">
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
            £
          </span>
          <input
            id="amount"
            name="amount"
            type="number"
            value={props.amount}
            onChange={(e) => props.onChange("amount", e.target.valueAsNumber)}
            placeholder="2000"
            className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </td>
      <td className="px-4 py-2">
        <div className="flex rounded-md shadow-sm">
          <input
            id="yearly-increase"
            name="yearly-increase"
            type="number"
            value={props.yearlyIncrease}
            onChange={(e) =>
              props.onChange("increasePerAnnum", e.target.valueAsNumber)
            }
            placeholder="5"
            className="block w-full min-w-0 flex-1 rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
            %
          </span>
        </div>
      </td>
      <td className="px-4 py-2">
        <div className="rounded-md shadow-sm flex">
          <input
            id="annual-interest"
            name="annual-interest"
            type="number"
            value={props.annualInterest}
            onChange={(e) =>
              props.onChange("annualInterest", e.target.valueAsNumber)
            }
            placeholder="5"
            className="block w-full min-w-0 flex-1 rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
            %
          </span>
        </div>
      </td>
      <td className="px-4 py-2">
        <button
          onClick={props.onDelete}
          className="self-end rounded-md bg-red-900 text-gray-200 px-3 py-1.5"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default MonthlyBudgetForm;
