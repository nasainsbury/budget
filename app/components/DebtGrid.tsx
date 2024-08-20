"use client";
import Edit from "../icons/Edit";
import Trash from "../icons/Trash";
import { useFinanceStore } from "../store/useBudgetStore";

function DebtGrid() {
  const { debt, deleteDebt } = useFinanceStore();

  return (
    <div className="flex flex-col gap-y-6 border border-stone-500 bg-[#18181b] px-6 py-4 rounded">
      <h2 className="text-lg font-bold font-sans text-stone-200">Debts</h2>
      <ul className="flex flex-col gap-y-4">
        {debt.map((d, index) => (
          <li key={d.name}>
            <DebtGridRow
              name={d.name}
              amount={d.amount}
              balance={d.startingBalance}
              yearlyIncrease={d.increasePerAnnum}
              onDelete={() => deleteDebt(index)}
            />
          </li>
        ))}
      </ul>
      <button className="border-stone-300 bg-[#0f0f10] py-1.5 text-sm border text-stone-200 font-mono hover:bg-stone-400 hover:text-stone-900">
        Add debt
      </button>
    </div>
  );
}

type DebtGridRowProps = {
  name: string;
  amount: number;
  balance: number;
  yearlyIncrease: number;
  onDelete: () => void;
};

function DebtGridRow(props: DebtGridRowProps) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-y-1">
        <div className="flex gap-x-2">
          <span className="font-bold text-stone-200">{props.name}</span>
          <span className="text-stone-200">- ${props.balance}</span>
        </div>
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
          <Trash className="text-stone-200" onClick={props.onDelete} />
        </button>
      </div>
    </div>
  );
}

export default DebtGrid;
