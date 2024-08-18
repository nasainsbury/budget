import { DateTime } from "luxon";
import { type BudgetPeriod, type BudgetConfig } from "../types";

export function generateBudget(
  config: BudgetConfig,
  startingDate: DateTime,
  months: number
): BudgetPeriod[] {
  const periods: BudgetPeriod[] = [];
  let date = startingDate;
  let yearsPassed = 0;

  for (let month = 0; month < months; month++) {
    if (date.get("month") === 1) {
      yearsPassed++;
    }
    const previousMonth = periods[month - 1] ?? null;

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
    config.income.forEach((income) => {
      const increasePerAnnum = 1 + income.increasePerAnnum / 100;
      const amount = income.amount * Math.pow(increasePerAnnum, yearsPassed);

      budgetPeriod.income.fields.push({
        name: income.name,
        amount,
      });

      budgetPeriod.income.total += amount;
    });

    // Calculate expenses
    config.expenses.forEach((expense) => {
      const increasePerAnnum = 1 + expense.increasePerAnnum / 100;
      const amount = expense.amount * Math.pow(increasePerAnnum, yearsPassed);

      budgetPeriod.income.fields.push({
        name: expense.name,
        amount,
      });

      budgetPeriod.expenses.total += amount;
    });

    // Calculate debt
    config.debt.forEach((debt, index) => {
      const increasePerAnnum = 1 + debt.increasePerAnnum / 100;
      let balance = previousMonth
        ? previousMonth.debt.fields[index].balance
        : debt.startingBalance;
      let amount = debt.amount * Math.pow(increasePerAnnum, yearsPassed);

      if (amount >= balance) {
        amount = balance;
        balance = 0;
      } else {
        balance -= amount;
      }

      budgetPeriod.debt.fields.push({
        amount,
        balance,
        name: debt.name,
      });

      budgetPeriod.debt.totalBalance += balance;
      budgetPeriod.debt.total += amount;
    });

    // Calculate savings
    config.savings.forEach((savings, index) => {
      const increasePerAnnum = 1 + savings.increasePerAnnum / 100;
      let balance = previousMonth
        ? previousMonth.savings.fields[index].balance
        : savings.startingBalance;
      let amount = savings.amount * Math.pow(increasePerAnnum, yearsPassed);

      const interestRate = savings.annualInterest / 100;

      if (savings.interestPaid === "yearly" && date.get("month") === 1) {
        balance *= 1 + interestRate;
      } else if (savings.interestPaid === "monthly") {
        balance *= 1 + interestRate / 12;
      }

      balance += amount;

      budgetPeriod.savings.fields.push({
        name: savings.name,
        amount: amount,
        balance: balance,
      });

      budgetPeriod.savings.total += amount;
      budgetPeriod.savings.totalBalance += balance;
    });

    config.oneOffs.forEach((oneOff) => {
      if (oneOff.date.month === date.month && oneOff.date.year === date.year) {
        if (oneOff.type === "expense") {
          budgetPeriod.expenses.total += oneOff.amount;
          budgetPeriod.expenses.fields.push({
            amount: oneOff.amount,
            name: oneOff.name,
          });
        }

        if (oneOff.type === "income") {
          budgetPeriod.income.total += oneOff.amount;
          budgetPeriod.income.fields.push({
            amount: oneOff.amount,
            name: oneOff.name,
          });
        }
      }
    });

    const net =
      budgetPeriod.income.total -
      budgetPeriod.debt.total -
      budgetPeriod.expenses.total -
      budgetPeriod.savings.total;

    const netName = config.meta.netRemaining.name;

    if (config.meta.netRemaining.type === "savings") {
      budgetPeriod.savings.fields.forEach((field, index) => {
        if (field.name === netName) {
          budgetPeriod.savings.fields[index].amount += net;
          budgetPeriod.savings.fields[index].balance += net;
          budgetPeriod.savings.total += net;
          budgetPeriod.savings.totalBalance += net;
        }
      });
    }

    // Incremement the month
    date = date.set({ month: date.month + 1 });

    periods.push(budgetPeriod);
  }

  return periods;
}
