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
          date: { month: 12, year: 2024 },
        },
        {
          amount: 260,
          name: "Pokemon cards",
          type: "income",
          date: { month: 8, year: 2024 },
        },
        {
          amount: 725,
          name: "Dentist",
          type: "expense",
          date: { month: 8, year: 2024 },
        },
        {
          amount: 520,
          name: "Car",
          type: "expense",
          date: { month: 8, year: 2024 },
        },
        {
          amount: 400,
          name: "Willow's Present",
          type: "expense",
          date: { month: 10, year: 2024 },
        },
        {
          amount: 400,
          name: "Christmas",
          type: "expense",
          date: { month: 12, year: 2024 },
        },
      ],
      meta: { netRemaining: { name: "ISA", type: "savings" } },
      income: [{ amount: 4360, name: "Salary", increasePerAnnum: 5 }],
      expenses: [
        { amount: 150, name: "Parking", increasePerAnnum: 0 },
        {
          amount: 110,
          name: "Council Tax",
          increasePerAnnum: 3,
        },
        { amount: 28, name: "Water", increasePerAnnum: 3 },
        { amount: 110, name: "Energy", increasePerAnnum: 3 },
        { amount: 91, name: "Car Insurance", increasePerAnnum: -20 },
        { amount: 50, name: "Subscriptions", increasePerAnnum: 3 },
        { amount: 800, name: "General", increasePerAnnum: 3 },
        { amount: 38, name: "Internet", increasePerAnnum: 2 },
        { name: "Rent", amount: 1250, increasePerAnnum: 2 },
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
          startingBalance: 0,
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
      <div className="flex flex-col gap-y-2 max-w-fit">
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
            <tr className="text-left">
              <th className="border-2 border-gray-300 px-1.5 py-1">Name</th>
              <th className="border-2 border-gray-300 px-1.5 py-1">Amount</th>
              <th className="border-2 border-gray-300 px-1.5 py-1">
                Yearly Increase
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {config.income.map((income, index) => (
              <MonthlyIncome
                key={index}
                type="income"
                name={income.name}
                amount={income.amount}
                increasePerAnnum={income.increasePerAnnum}
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
      <div className="flex flex-col gap-y-2 max-w-fit">
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
            <tr className="text-left">
              <th className="border-2 border-gray-300 px-1.5 py-1">Name</th>
              <th className="border-2 border-gray-300 px-1.5 py-1">Amount</th>
              <th className="border-2 border-gray-300 px-1.5 py-1">
                Yearly Increase
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {config.expenses.map((expense, index) => (
              <MonthlyIncome
                key={expense.name}
                name={expense.name}
                amount={expense.amount}
                type="expenses"
                increasePerAnnum={expense.increasePerAnnum}
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
            {config.expenses.length === 0 && <tr></tr>}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-y-2 max-w-fit">
        <div className="flex gap-x-4 items-center">
          <h2 className="text-gray-950 font-semibold text-lg">Debt</h2>
          <button
            onClick={() => addRow("debt")}
            className="bg-green-800 text-white rounded-md px-4 py-2 self-center h-auto"
          >
            +
          </button>
        </div>
        <table>
          <thead>
            <tr className="text-left">
              <th className="border-2 border-gray-300 px-1.5 py-1">Name</th>
              <th className="border-2 border-gray-300 px-1.5 py-1">Balance</th>
              <th className="border-2 border-gray-300 px-1.5 py-1">Amount</th>
              <th className="border-2 border-gray-300 px-1.5 py-1">
                Yearly Increase
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {config.debt.map((debt, index) => (
              <Debt
                key={index}
                name={debt.name}
                amount={debt.amount}
                increasePerAnnum={debt.increasePerAnnum}
                startingBalance={debt.startingBalance}
                onDelete={() => {
                  setConfig((config) => {
                    const updated = config.debt.filter((_, i) => i !== index);
                    return { ...config, debt: updated };
                  });
                }}
                onChange={(key, value) => {
                  setConfig((prevConfig) => {
                    const updated = [...prevConfig.debt];
                    updated[index] = {
                      ...updated[index],
                      [key]: value,
                    };
                    return { ...prevConfig, debt: updated };
                  });
                }}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-y-2 max-w-fit">
        <div className="flex gap-x-4 items-center">
          <h2 className="text-gray-950 font-semibold text-lg">Savings</h2>
          <button
            onClick={() => addRow("savings")}
            className="bg-green-800 text-white rounded-md px-4 py-2 self-center h-auto"
          >
            +
          </button>
        </div>
        <table>
          <thead>
            <tr className="text-left">
              <th className="border-2 border-gray-300 px-1.5 py-1">Name</th>
              <th className="border-2 border-gray-300 px-1.5 py-1">Balance</th>
              <th className="border-2 border-gray-300 px-1.5 py-1">Amount</th>
              <th className="border-2 border-gray-300 px-1.5 py-1">
                Yearly Increase
              </th>
              <th className="border-2 border-gray-300 px-1.5 py-1">
                Annual Interest
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {config.savings.map((savings, index) => (
              <Savings
                key={index}
                name={savings.name}
                amount={savings.amount}
                increasePerAnnum={savings.increasePerAnnum}
                annualInterest={savings.annualInterest}
                startingBalance={savings.startingBalance}
                interestPaid={savings.interestPaid}
                onDelete={() => {
                  setConfig((config) => {
                    const updated = config.savings.filter(
                      (_, i) => i !== index
                    );
                    return { ...config, savings: updated };
                  });
                }}
                onChange={(key, value) => {
                  setConfig((prevConfig) => {
                    const updated = [...prevConfig.savings];
                    updated[index] = {
                      ...updated[index],
                      [key]: value,
                    };
                    return { ...prevConfig, savings: updated };
                  });
                }}
              />
            ))}
            {config.savings.length === 0 && <tr></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type MonthlyIncomeProps = {
  name: string;
  amount: number;
  increasePerAnnum: number;
  type: string;
  onChange: (key: string, value: string | number) => void;
  onDelete: () => void;
};

function MonthlyIncome(props: MonthlyIncomeProps) {
  return (
    <tr className="text-gray-900 border-2 border-gray-300">
      <td className="focus-within:outline border-2 border-gray-300">
        <div className="flex w-full h-full px-1.5 py-1">
          <input
            id={`${props.type}-name`}
            name={`${props.type}-name`}
            type="string"
            value={props.name}
            onChange={(e) => props.onChange("name", e.target.value)}
            placeholder="Income"
            className="w-full placeholder:text-gray-400 outline-none ring-0 focus:outline-none focus:ring-0 px-1.5 py-1"
          />
        </div>
      </td>
      <td className="border-2 border-gray-300 group group-focus:outline-green-700 focus-within:outline">
        <div className="flex w-full h-full px-1.5 py-1">
          <span className="inline-flex items-center text-gray-500">£</span>
          <input
            id={`${props.type}-amount`}
            name={`${props.type}-amount`}
            type="number"
            value={props.amount}
            onChange={(e) => props.onChange("amount", e.target.valueAsNumber)}
            placeholder="2000"
            className="w-full min-h-max border-0 outline-none ring-0 focus:outline-none focus:ring-0"
          />
        </div>
      </td>
      <td className="border-2 border-gray-300 group group-focus:outline-green-700 focus-within:outline">
        <div className="flex w-full h-full px-1.5 py-1">
          <input
            id={`${props.type}-increasePerAnnum`}
            name={`${props.type}-increasePerAnnum`}
            type="number"
            value={props.increasePerAnnum}
            onChange={(e) =>
              props.onChange("increasePerAnnum", e.target.valueAsNumber)
            }
            placeholder="5"
            className="w-full min-h-max border-none outline-none ring-0 focus:outline-none focus:ring-0"
          />
          <span className="inline-flex items-center text-gray-500">%</span>
        </div>
      </td>
      <td className="border-2 border-gray-300 bg-red-800 text-white">
        <button
          onClick={props.onDelete}
          className="self-end rounded-md px-3 py-1.5 w-full h-full min-h-max"
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
  increasePerAnnum: number;
  annualInterest: number;
  interestPaid: "monthly" | "yearly";
  startingBalance: number;
  onChange: (key: string, value: string | number) => void;
  onDelete: () => void;
};

function Savings(props: SavingsProps) {
  return (
    <tr className="text-gray-900 border-2 border-gray-300">
      <td className="focus-within:outline border-2 border-gray-300">
        <div className="flex w-full h-full px-1.5 py-1">
          <input
            id="name"
            name="name"
            type="string"
            value={props.name}
            onChange={(e) => props.onChange("name", e.target.value)}
            placeholder="Income"
            className="w-full placeholder:text-gray-400 outline-none ring-0 focus:outline-none focus:ring-0 px-1.5 py-1"
          />
        </div>
      </td>
      <td className="border-2 border-gray-300 group group-focus:outline-green-700 focus-within:outline">
        <div className="flex w-full h-full px-1.5 py-1">
          <span className="inline-flex items-center text-gray-500">£</span>
          <input
            id="startingBalance"
            name="startingBalance"
            type="number"
            value={props.startingBalance}
            onChange={(e) =>
              props.onChange("startingBalance", e.target.valueAsNumber)
            }
            placeholder="10000"
            className="w-full min-h-max border-0 outline-none ring-0 focus:outline-none focus:ring-0"
          />
        </div>
      </td>
      <td className="border-2 border-gray-300 group group-focus:outline-green-700 focus-within:outline">
        <div className="flex w-full h-full px-1.5 py-1">
          <span className="inline-flex items-center text-gray-500">£</span>
          <input
            id="amount"
            name="amount"
            type="number"
            value={props.amount}
            onChange={(e) => props.onChange("amount", e.target.valueAsNumber)}
            placeholder="300"
            className="w-full min-h-max border-0 outline-none ring-0 focus:outline-none focus:ring-0"
          />
        </div>
      </td>
      <td className="border-2 border-gray-300 group group-focus:outline-green-700 focus-within:outline">
        <div className="flex w-full h-full px-1.5 py-1">
          <input
            id="increasePerAnnum"
            name="increasePerAnnum"
            type="number"
            value={props.increasePerAnnum}
            onChange={(e) =>
              props.onChange("increasePerAnnum", e.target.valueAsNumber)
            }
            placeholder="5"
            className="w-full min-h-max border-none outline-none ring-0 focus:outline-none focus:ring-0"
          />
          <span className="inline-flex items-center text-gray-500">%</span>
        </div>
      </td>
      <td className="border-2 border-gray-300 group group-focus:outline-green-700 focus-within:outline">
        <div className="flex w-full h-full px-1.5 py-1">
          <input
            id="interest"
            name="interest"
            type="number"
            value={props.annualInterest}
            onChange={(e) =>
              props.onChange("annualInterest", e.target.valueAsNumber)
            }
            placeholder="3"
            className="w-full min-h-max border-none outline-none ring-0 focus:outline-none focus:ring-0"
          />
          <span className="inline-flex items-center text-gray-500">%</span>
        </div>
      </td>
      <td className="border-2 border-gray-300 bg-red-800 text-white">
        <button
          onClick={props.onDelete}
          className="self-end rounded-md px-3 py-1.5 w-full h-full min-h-max"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

type DebtProps = {
  name: string;
  amount: number;
  increasePerAnnum: number;
  startingBalance: number;
  onChange: (key: string, value: string | number) => void;
  onDelete: () => void;
};

function Debt(props: DebtProps) {
  return (
    <tr className="text-gray-900 border-2 border-gray-300">
      <td className="focus-within:outline border-2 border-gray-300">
        <div className="flex w-full h-full px-1.5 py-1">
          <input
            id="name"
            name="name"
            type="string"
            value={props.name}
            onChange={(e) => props.onChange("name", e.target.value)}
            placeholder="Income"
            className="w-full placeholder:text-gray-400 outline-none ring-0 focus:outline-none focus:ring-0 px-1.5 py-1"
          />
        </div>
      </td>
      <td className="border-2 border-gray-300 group group-focus:outline-green-700 focus-within:outline">
        <div className="flex w-full h-full px-1.5 py-1">
          <span className="inline-flex items-center text-gray-500">£</span>
          <input
            id="startingBalance"
            name="startingBalance"
            type="number"
            value={props.startingBalance}
            onChange={(e) =>
              props.onChange("startingBalance", e.target.valueAsNumber)
            }
            placeholder="10000"
            className="w-full min-h-max border-0 outline-none ring-0 focus:outline-none focus:ring-0"
          />
        </div>
      </td>
      <td className="border-2 border-gray-300 group group-focus:outline-green-700 focus-within:outline">
        <div className="flex w-full h-full px-1.5 py-1">
          <span className="inline-flex items-center text-gray-500">£</span>
          <input
            id="amount"
            name="amount"
            type="number"
            value={props.amount}
            onChange={(e) => props.onChange("amount", e.target.valueAsNumber)}
            placeholder="300"
            className="w-full min-h-max border-0 outline-none ring-0 focus:outline-none focus:ring-0"
          />
        </div>
      </td>
      <td className="border-2 border-gray-300 group group-focus:outline-green-700 focus-within:outline">
        <div className="flex w-full h-full px-1.5 py-1">
          <input
            id="increasePerAnnum"
            name="increasePerAnnum"
            type="number"
            value={props.increasePerAnnum}
            onChange={(e) =>
              props.onChange("increasePerAnnum", e.target.valueAsNumber)
            }
            placeholder="5"
            className="w-full min-h-max border-none outline-none ring-0 focus:outline-none focus:ring-0"
          />
          <span className="inline-flex items-center text-gray-500">%</span>
        </div>
      </td>
      <td className="border-2 border-gray-300 bg-red-800 text-white">
        <button
          onClick={props.onDelete}
          className="self-end rounded-md px-3 py-1.5 w-full h-full min-h-max"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default MonthlyBudgetForm;
