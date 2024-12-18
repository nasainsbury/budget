import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";

interface FormLayoutProps {
  title: string;
  description: string;
  addTitle: string;
  children: React.ReactNode;
}

function FormLayout(props: FormLayoutProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="space-y-2">
          <CardTitle>{props.title}</CardTitle>
          <CardDescription>{props.description}</CardDescription>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              {props.addTitle}
            </Button>
          </DialogTrigger>
          <BudgetForm />
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-6"></CardContent>
    </Card>
  );
}

function BudgetForm() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Income Source</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-6 py-2">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" className="col-span-3" placeholder="Salary" />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="username">Current balance</Label>
          <div className="flex col-span-3">
            <span className="flex items-center px-3 text-base font-semibold rounded-md border border-input rounded-r-none shadow-sm transition-colors">
              $
            </span>
            <Input
              id="amount"
              placeholder="3200"
              className="col-span-3 w-full border-l-0 rounded-l-none"
              type="number"
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="username">Monthly Amount</Label>
          <div className="flex col-span-3">
            <span className="flex items-center px-3 text-base font-semibold rounded-md border border-input rounded-r-none shadow-sm transition-colors">
              $
            </span>
            <Input
              id="amount"
              placeholder="3200"
              className="col-span-3 w-full border-l-0 rounded-l-none"
              type="number"
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="username">Expected Yearly Increase</Label>
          <div className="flex col-span-3">
            <Input
              id="amount"
              placeholder="3200"
              className="col-span-3 w-full border-r-0 rounded-r-none"
              type="number"
            />
            <span className="flex items-center px-3 text-base font-semibold rounded-md border border-input rounded-l-none shadow-sm transition-colors">
              %
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="username">Yearly Interest</Label>
          <div className="flex col-span-3">
            <Input
              id="amount"
              placeholder="3200"
              className="col-span-3 w-full border-r-0 rounded-r-none"
              type="number"
            />
            <span className="flex items-center px-3 text-base font-semibold rounded-md border border-input rounded-l-none shadow-sm transition-colors">
              %
            </span>
          </div>
        </div>
      </div>
      <Button>Add</Button>
    </DialogContent>
  );
}

export default FormLayout;
