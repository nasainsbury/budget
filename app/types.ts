import { DateTime } from "luxon";
export type BudgetConfig = {
  inflation: number;
  income: Money[];
  expenses: Money[];
  savings: Savings[];
  debt: Debt[];
  oneOffExpenses: OneOffExpense[];
};

export type OneOffExpense = {
  name: string;
  amount: number;
  date: DateTime;
};

export type Money = {
  name: string;
  amount: number;
  yearlyIncrease: number;
};

export type Savings = {
  name: string;
  startingAmount: number;
  amount: number;
  yearlyIncrease: number;
  yearlyInterest: number;
};

export type Debt = {
  name: string;
  startingAmount: number;
  amount: number;
};

export type BudgetOutput = {
  date: DateTime;
  leftOver: number;
  totalLeftOver: number;
  income: {
    total: number;
    breakdown: Array<{ name: string; amount: number }>;
  };
  expenses: {
    total: number;
    breakdown: Array<{ name: string; amount: number }>;
  };
  savings: {
    total: number;
    breakdown: Array<{
      name: string;
      amount: number;
      total: number;
      interest: number;
    }>;
  };
  debt: {
    total: number;
    breakdown: Array<{ name: string; amount: number; remaining: number }>;
  };
};

export type HouseConfig = {
  housePrice: number;
  houseDepositPercentage: number;
  startingBalance: number;
  houseValueAppreciate: number;
  mortgageRate: number;
  mortgageTerm: number;
  salary: number;
  salaryIncrease: number;
  savingsPercent: number;
  savingsInterest: number;
  inflation: number;
};

export type HousePeriod = {
  year: number;
  salary: number;
  savings: number;
  houseValue: number;
  houseRemainingBalance: number;
  mortgagePayment: number;
  interestPaid: number;
  savingsInterestAccrued: number;
  realTermsSavings: number;
  realTermsInterest: number;
};
