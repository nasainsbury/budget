"use client";

import Edit from "../icons/Edit";
import Trash from "../icons/Trash";
import { useFinanceStore } from "../store/useBudgetStore";

function IncomeGrid() {
  const { income, deleteIncome } = useFinanceStore();
  return (
    <div className="flex flex-col gap-y-6 border border-stone-500 bg-[#18181b] px-6 py-4 rounded-md">
      <h2 className="text-lg font-bold font-sans text-stone-200">Income</h2>
      <ul className="flex flex-col gap-y-4">
        {income.map((inc, index) => (
          <li>
            <IncomeGridRow
              name={inc.name}
              amount={inc.amount}
              yearlyIncrease={inc.increasePerAnnum}
              onDelete={() => deleteIncome(index)}
            />
          </li>
        ))}
      </ul>
      <button className="border-stone-300 bg-[#0f0f10] py-1.5 text-sm border text-stone-200 font-mono hover:bg-stone-400 hover:text-stone-900">
        Add income
      </button>
    </div>
  );
}

type IncomeGridRowProps = {
  name: string;
  amount: number;
  yearlyIncrease: number;
  onDelete: () => void;
};

function IncomeGridRow(props: IncomeGridRowProps) {
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
        <button onClick={props.onDelete}>
          <Trash className="text-stone-200" />
        </button>
      </div>
    </div>
  );
}

export default IncomeGrid;
