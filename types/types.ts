export type Income = {
  name: string;
  monthlyAmount: number;
  yearlyChange: number;
};

export type Expense = {
  name: string;
  monthlyAmount: number;
  yearlyChange: number;
};

export type Debt = {
  name: string;
  monthlyAmount: number;
  balance: number;
};

export type Savings = {
  name: string;
  monthlyAmount: number;
  balance: number;
  yearlyChange: number;
  yearlyInterest: number;
};

export type Mortgate = {
  name: string;
  originalBalance: number;
  balance: number;
  interestRate: number;
  remainingTermYears: number;
};

export type Pension = {
  name: string;
  balance: number;
  interestRate: number;
  employerContribution: number;
  employeeContribution: number;
};
