import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Income from "@/components/Income/Income";

function NewPage() {
  return (
    <main className="px-12 py-4 mx-auto">
      <Tabs defaultValue="income" className="mx-auto w-[600px]">
        <TabsList>
          <TabsTrigger value="income" className="px-6">
            Income
          </TabsTrigger>
          <TabsTrigger value="expenses" className="px-6">
            Expenses
          </TabsTrigger>
          <TabsTrigger value="mortgage" className="px-6">
            Mortgage
          </TabsTrigger>
          <TabsTrigger value="debts" className="px-6">
            Debts
          </TabsTrigger>
          <TabsTrigger value="savings" className="px-6">
            Savings
          </TabsTrigger>
          <TabsTrigger value="pension" className="px-6">
            Pension
          </TabsTrigger>
        </TabsList>
        <TabsContent value="income">
          <Income />
        </TabsContent>
        <TabsContent value="password"></TabsContent>
      </Tabs>
    </main>
  );
}

export default NewPage;
