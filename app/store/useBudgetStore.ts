import create from "zustand";
import {
  DebtConfig,
  ExpensesConfig,
  IncomeConfig,
  SavingsConfig,
} from "../types";

type BudgetStore = {
  income: IncomeConfig[];
  expenses: ExpensesConfig[];
  debt: DebtConfig[];
  savings: SavingsConfig[];

  addIncome: (income: IncomeConfig) => void;
  editIncome: (index: number, updatedIncome: IncomeConfig) => void;
  deleteIncome: (index: number) => void;
};

export const useFinanceStore = create<BudgetStore>((set) => ({
  income: [
    {
      amount: 4360,
      name: "Salary",
      increasePerAnnum: 5,
    },
  ],
  debt: [
    {
      amount: 500,
      increasePerAnnum: 0,
      name: "Monzo Loan",
      startingBalance: 6750,
    },
    {
      amount: 50,
      increasePerAnnum: 0,
      name: "Phone Loan",
      startingBalance: 500,
    },
  ],
  expenses: [
    {
      amount: 1250,
      name: "Rent",
      increasePerAnnum: 2,
      startingBalance: 3005,
    },
    {
      amount: 150,
      name: "Parking",
      increasePerAnnum: 0,
      startingBalance: 1048,
    },
    {
      amount: 110,
      name: "Council Tax",
      increasePerAnnum: 3,
    },
    {
      amount: 28,
      name: "Water",
      increasePerAnnum: 3,
    },
    {
      amount: 110,
      name: "Energy",
      increasePerAnnum: 3,
    },
    {
      amount: 91,
      name: "Car Insurance",
      increasePerAnnum: -20,
    },
    {
      amount: 50,
      name: "Subscriptions",
      increasePerAnnum: 3,
    },
    {
      amount: 800,
      name: "General",
      increasePerAnnum: 3,
    },
    {
      amount: 38,
      name: "Internet",
      increasePerAnnum: 2,
    },
  ],
  savings: [
    {
      amount: 300,
      annualInterest: 9,
      increasePerAnnum: 5,
      interestPaid: "monthly",
      name: "ISA",
      startingBalance: 300,
    },
    {
      amount: 0,
      annualInterest: 4.4,
      increasePerAnnum: 5,
      interestPaid: "monthly",
      name: "Pot",
      startingBalance: 10480,
    },
  ],

  addIncome: (newIncome) =>
    set((state) => ({ income: [...state.income, newIncome] })),
  editIncome: (index, updatedIncome) =>
    set((state) => {
      const updatedIncomes = [...state.income];
      updatedIncomes[index] = updatedIncome;
      return { income: updatedIncomes };
    }),
  deleteIncome: (index) =>
    set((state) => ({
      income: state.income.filter((_, i) => i !== index),
    })),
}));
