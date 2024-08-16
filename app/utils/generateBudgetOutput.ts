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
    const shouldIncrease = date.get("month") === 12;

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
        field.increase = field.amount * (1 + income.increasePerAnnum);
        field.amount += field.increase;
      }

      budgetPeriod.income.total += field.amount;
      budgetPeriod.income.fields.push(field);
    });

    // Calculate expenses
    config.expenses.forEach((expense, index) => {
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
        field.increase = field.amount * (1 + expense.increasePerAnnum);
        field.amount += field.increase;
      }

      budgetPeriod.expenses.total += field.amount;
      budgetPeriod.expenses.fields.push(field);
    });

    // Calculate debt
    config.debt.forEach((income, index) => {
      const field = {
        name: income.name,
        amount: 0,
        increase: 0,
        balance: 0,
      };

      if (previousMonth) {
        field.amount = previousMonth.income.fields[index].amount;
      } else {
        field.amount = income.amount;
      }

      if (shouldIncrease) {
        field.increase = field.amount * (1 + income.increasePerAnnum);
        field.amount += field.increase;
      }

      field.balance -= field.amount;

      budgetPeriod.income.total += field.amount;
      budgetPeriod.debt.totalBalance += field.balance;
      budgetPeriod.debt.fields.push(field);
    });

    // Incremement the month
    date = startingDate.set({ month: date.month + 1 });

    periods.push(budgetPeriod);
  }

  return periods;
}
