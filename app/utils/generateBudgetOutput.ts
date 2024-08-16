import { DateTime } from "luxon";
import { type BudgetPeriod, type BudgetConfig } from "../types";

export function generateBudget(
  config: BudgetConfig,
  startingDate: DateTime,
  months: number
): BudgetPeriod[] {
  const periods: BudgetPeriod[] = [];
  let date = startingDate;

  for (let month = 0; month < months; month++) {
    const previousMonth = periods[month - 1] ?? null;
    const shouldIncrease = date.get("month") === 1;

    const budgetPeriod: BudgetPeriod = {
      date,
      income: {
        total: 0,
        fields: [],
      },
      expenses: {
        total: 0,
        fields: [],
      },
      debt: {
        total: 0,
        totalBalance: 0,
        fields: [],
      },
      savings: {
        total: 0,
        totalBalance: 0,
        fields: [],
      },
    };

    // Calculate income
    config.income.forEach((income, index) => {
      const increasePerAnnum = income.increasePerAnnum / 100;

      const field = {
        name: income.name,
        amount: 0,
        increase: 0,
      };

      if (previousMonth) {
        field.amount = previousMonth.income.fields[index].amount;
      } else {
        field.amount = income.amount;
      }

      if (shouldIncrease) {
        field.amount = field.amount * (1 + increasePerAnnum);
      }

      budgetPeriod.income.total += field.amount;
      budgetPeriod.income.fields.push(field);
    });

    // Calculate expenses
    config.expenses.forEach((expense, index) => {
      const increasePerAnnum = expense.increasePerAnnum / 100;

      const field = {
        name: expense.name,
        amount: 0,
        increase: 0,
      };

      if (previousMonth) {
        field.amount = previousMonth.expenses.fields[index].amount;
      } else {
        field.amount = expense.amount;
      }

      if (shouldIncrease) {
        field.amount = field.amount * (1 + increasePerAnnum);
      }

      budgetPeriod.expenses.total += field.amount;
      budgetPeriod.expenses.fields.push(field);
    });

    // Calculate debt
    config.debt.forEach((debt, index) => {
      const increasePerAnnum = debt.increasePerAnnum / 100;

      const field = {
        name: debt.name,
        amount: 0,
        balance: 0,
      };

      if (previousMonth) {
        field.amount = previousMonth.debt.fields[index].amount;
        field.balance = previousMonth.debt.fields[index].balance;
      } else {
        field.amount = debt.amount;
        field.balance = debt.startingBalance;
      }

      if (shouldIncrease) {
        field.amount = field.amount * (1 + increasePerAnnum);
      }

      if (field.amount >= field.balance) {
        field.amount = field.balance;
        field.balance = 0;
      } else {
        field.balance -= field.amount;
      }

      budgetPeriod.debt.total += field.amount;
      budgetPeriod.debt.totalBalance += field.balance;
      budgetPeriod.debt.fields.push(field);
    });

    // Calculate savings
    config.savings.forEach((savings, index) => {
      const increasePerAnnum = savings.increasePerAnnum / 100;
      const interestRate = savings.annualInterest / 100;

      const field = {
        name: savings.name,
        amount: 0,
        balance: 0,
        interest: 0,
      };

      // set defaults
      if (previousMonth) {
        field.amount = previousMonth.savings.fields[index].amount;
        field.balance = previousMonth.savings.fields[index].balance;
      } else {
        field.amount = savings.amount;
        field.balance = savings.startingBalance;
      }

      if (shouldIncrease) {
        field.amount = field.amount * (1 + increasePerAnnum);
      }

      if (savings.interestPaid === "yearly") {
        if (shouldIncrease) {
          field.interest = field.balance * interestRate;
        }
      } else {
        // "monthly"
        field.interest = field.balance * (interestRate / 12);
      }

      field.balance += field.amount + field.interest;

      budgetPeriod.savings.total += field.amount;
      budgetPeriod.savings.totalBalance += field.balance;
      budgetPeriod.savings.fields.push(field);
    });

    const net =
      budgetPeriod.income.total -
      budgetPeriod.debt.total -
      budgetPeriod.expenses.total -
      budgetPeriod.savings.total;

    const netName = config.meta.netRemaining.name;

    if (config.meta.netRemaining.type === "savings") {
      let found = false;

      budgetPeriod.savings.fields.forEach((field, index) => {
        if (field.name === netName) {
          budgetPeriod.savings.fields[index].amount += net;
          budgetPeriod.savings.fields[index].balance += net;
          found = true;
        }
      });

      if (found) {
        budgetPeriod.savings.total += net;
      }
    }

    // Incremement the month
    date = startingDate.set({ month: date.month + 1 });

    periods.push(budgetPeriod);
  }

  return periods;
}
