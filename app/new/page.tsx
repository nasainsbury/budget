import DebtGrid from "../components/DebtGrid";
import ExpensesGrid from "../components/ExpensesGrid";
import IncomeGrid from "../components/IncomeGrid";
import SavingsGrid from "../components/SavingsGrid";

function NewPage() {
  return (
    <div className="p-8">
      <div className="grid grid-cols-4 gap-x-12">
        <IncomeGrid />
        <ExpensesGrid />
        <DebtGrid />
        <SavingsGrid />
      </div>
    </div>
  );
}

export default NewPage;
