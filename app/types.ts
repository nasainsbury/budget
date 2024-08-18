import { type DateTime } from "luxon";

export type BudgetConfig = {
  income: IncomeConfig[];
  expenses: ExpensesConfig[];
  debt: DebtConfig[];
  savings: SavingsConfig[];
  oneOffs: OneOff[];
  meta: {
    netRemaining: {
      name: string;
      type: "expenses" | "savings";
    };
  };
};

export type OneOff = {
  name: string;
  amount: number;
  date: {
    month: number;
    year: number;
  };
  type: "income" | "expense";
};

export type CommonConfig = {
  name: string;
  amount: number;
  increasePerAnnum: number;
};

export type IncomeConfig = {} & CommonConfig;
export type ExpensesConfig = {} & CommonConfig;

export type DebtConfig = {
  startingBalance: number;
} & CommonConfig;

export type SavingsConfig = {
  startingBalance: number;
  annualInterest: number;
  interestPaid: "yearly" | "monthly";
} & CommonConfig;

/* BudgetOutput */
export type BudgetPeriod = {
  date: DateTime;
  income: BudgetIncome;
  expenses: BudgetExpense;
  debt: BudgetDebt;
  savings: BudgetSavings;
};

export type BudgetIncome = {
  total: number;
  fields: Array<{
    name: string;
    amount: number;
  }>;
};

export type BudgetExpense = {
  total: number;
  fields: Array<{
    name: string;
    amount: number;
  }>;
};

export type BudgetDebt = {
  total: number;
  totalBalance: number;
  fields: Array<{
    name: string;
    amount: number;
    balance: number;
  }>;
};

export type BudgetSavings = {
  total: number;
  totalBalance: number;
  fields: Array<{
    name: string;
    amount: number;
    balance: number;
    interest?: number;
  }>;
};

/** HOUSE */
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
