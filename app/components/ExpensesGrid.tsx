"use client";
import Edit from "../icons/Edit";
import Trash from "../icons/Trash";
import { useFinanceStore } from "../store/useBudgetStore";

function ExpensesGrid() {
  const { expenses } = useFinanceStore();

  return (
    <div className="flex flex-col gap-y-6 border border-stone-500 bg-[#18181b] px-6 py-4 rounded">
      <h2 className="text-lg font-bold font-sans text-stone-200">Expenses</h2>
      <ul className="flex flex-col gap-y-4">
        {expenses.map((expense) => (
          <li>
            <ExpensesGridRow
              name={expense.name}
              amount={expense.amount}
              yearlyIncrease={expense.increasePerAnnum}
            />
          </li>
        ))}
      </ul>
      <button className="border-stone-300 bg-[#0f0f10] py-1.5 text-sm border text-stone-200 font-mono hover:bg-stone-400 hover:text-stone-900">
        Add expenses
      </button>
    </div>
  );
}

type ExpensesGridRowProps = {
  name: string;
  amount: number;
  yearlyIncrease: number;
};

function ExpensesGridRow(props: ExpensesGridRowProps) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-y-1">
        <span className="font-bold text-stone-200">{props.name}</span>
        <div className="flex gap-x-2 text-sm text-stone-300 font-mono">
          <span>${props.amount}</span>
          <span>({props.yearlyIncrease}% yearly)</span>
        </div>
      </div>
      <div className="flex gap-x-4 items-end">
        <button>
          <Edit className="text-stone-200" />
        </button>
        <button>
          <Trash className="text-stone-200" />
        </button>
      </div>
    </div>
  );
}

export default ExpensesGrid;
