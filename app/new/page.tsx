import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import DebtGrid from "../components/DebtGrid";
import ExpensesGrid from "../components/ExpensesGrid";
import IncomeGrid from "../components/IncomeGrid";
import SavingsGrid from "../components/SavingsGrid";
import MonthlyBudgetTable from "../components/MonthlyBudgetTable";

function NewPage() {
  return (
    <main className="px-12 py-4">
      <TabGroup className="flex flex-col gap-y-4">
        <TabList className="gap-x-4 flex">
          <Tab className="rounded-md px-3 py-2 font-medium text-stone-200">
            Budget
          </Tab>
          <Tab className="rounded-md px-3 py-2 font-medium text-stone-200">
            Results
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="grid grid-cols-4 gap-x-12">
              <IncomeGrid />
              <ExpensesGrid />
              <DebtGrid />
              <SavingsGrid />
            </div>
          </TabPanel>
          <TabPanel>
            <MonthlyBudgetTable />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
}

export default NewPage;
