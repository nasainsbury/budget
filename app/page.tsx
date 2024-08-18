"use client";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import MonthlyBudgetTable from "./components/MonthlyBudgetTable";
import { DateTime } from "luxon";
import { generateBudget } from "./utils/generateBudgetOutput";
import MonthlyBudgetForm from "./components/MonthlyBudgetForm";
import { useEffect, useState } from "react";
import { BudgetConfig, BudgetPeriod } from "./types";

export default function Home() {
  const [config, setConfig] = useState<BudgetConfig>({
    oneOffs: [],
    meta: {
      netRemaining: {
        name: "pot",
        type: "savings",
      },
    },
    income: [],
    expenses: [],
    debt: [],
    savings: [],
  });

  const [budget, setBudget] = useState<BudgetPeriod[]>([]);

  useEffect(() => {
    setBudget(generateBudget(config, DateTime.now(), 24));
  }, [config]);

  return (
    <main className="px-12 py-4">
      <TabGroup className="flex flex-col gap-y-4">
        <TabList className="gap-x-4 flex">
          <Tab className="rounded-md px-3 py-2 font-medium text-gray-700 hover:text-gray-700">
            Budget
          </Tab>
          <Tab className="rounded-md px-3 py-2 font-medium text-gray-700 hover:text-gray-700">
            Results
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <MonthlyBudgetForm onChange={setConfig} />
          </TabPanel>
          <TabPanel>
            <MonthlyBudgetTable budget={budget} />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
}
