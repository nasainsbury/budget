import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import InputForm from "./components/InputForm";

export default function Home() {
  return (
    <main className="px-12 py-4">
      <TabGroup className="flex flex-col gap-y-4">
        <TabList className="gap-x-4 flex">
          <Tab>Budget</Tab>
          <Tab>Results</Tab>
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
