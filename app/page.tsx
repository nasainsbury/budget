import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import InputForm from "./components/InputForm";

export default function Home() {
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
          <TabPanel>Budget</TabPanel>
          <TabPanel>
            <InputForm />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
}
