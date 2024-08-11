import { BudgetConfig, BudgetOutput } from "../types";
import { DateTime } from "luxon";

export function generateBudgetOutput(config: BudgetConfig, months: number) {
  let date = DateTime.now();
  let budgetArray: BudgetOutput[] = [];
  console.log(date);
  for (let month = 0; month < months; month++) {
    const increase = date.get("month") === 1 && month !== 0;
    let budget: BudgetOutput = {
      date: date,
      debt: {
        total: 0,
        breakdown: [],
      },
      expenses: {
        total: 0,
        breakdown: [],
      },
      savings: {
        total: 0,
        breakdown: [],
      },
      income: {
        total: 0,
        breakdown: [],
      },
      leftOver: 0,
      totalLeftOver: 0,
    };

    let previousMonth = budgetArray[month - 1];

    config.income.forEach((income, index) => {
      const breakdown = {
        name: "",
        amount: 0,
      };
      if (month === 0) {
        budget.income.total += income.amount;
        breakdown.name = income.name;
        breakdown.amount = income.amount;
      } else {
        let amount = previousMonth.income.breakdown[index].amount;
        if (increase) {
          amount *= 1 + income.yearlyIncrease;
        }
        budget.income.total += amount;
        breakdown.name = income.name;
        breakdown.amount = amount;
      }
      budget.income.breakdown.push(breakdown);
    });

    config.expenses.forEach((expense, index) => {
      const breakdown = {
        name: "",
        amount: 0,
      };
      if (month === 0) {
        budget.expenses.total += expense.amount;
        breakdown.name = expense.name;
        breakdown.amount = expense.amount;
      } else {
        let amount = previousMonth.expenses.breakdown[index].amount;
        if (increase) {
          amount *= 1 + expense.yearlyIncrease;
        }
        budget.expenses.total += amount;
        breakdown.name = expense.name;
        breakdown.amount = amount;
      }
      budget.expenses.breakdown.push(breakdown);
    });

    config.debt.forEach((debt, index) => {
      const breakdown = {
        name: "",
        amount: 0,
        remaining: 0,
      };

      if (month === 0) {
        budget.debt.total += debt.amount;
        breakdown.name = debt.name;
        breakdown.amount = debt.amount;
        breakdown.remaining = debt.startingAmount - debt.amount;
      } else {
        let amount = previousMonth.debt.breakdown[index].amount;
        let remaining = previousMonth.debt.breakdown[index].remaining;

        if (amount >= remaining) {
          amount = remaining;
          remaining = 0;
        } else {
          remaining -= amount;
        }

        budget.debt.total += amount;
        breakdown.name = debt.name;
        breakdown.amount = amount;
        breakdown.remaining = remaining;
      }
      budget.debt.breakdown.push(breakdown);
    });

    config.savings.forEach((savings, index) => {
      const breakdown = {
        name: "",
        amount: 0,
        total: 0,
        interest: 0,
      };
      if (month === 0) {
        budget.savings.total += savings.amount;
        breakdown.name = savings.name;
        breakdown.amount = savings.amount;
        breakdown.total = savings.startingAmount;
      } else {
        let amount = previousMonth.savings.breakdown[index].amount;

        if (increase) {
          amount *= 1 + savings.yearlyIncrease;
        }

        let total = previousMonth.savings.breakdown[index].total + amount;
        let interest = 0;

        if (increase) {
          interest = total * savings.yearlyInterest;
        }

        budget.savings.total += amount;
        breakdown.name = savings.name;
        breakdown.interest = interest;
        breakdown.amount = amount;
        breakdown.total = total;
      }
      budget.savings.breakdown.push(breakdown);
    });

    budget.leftOver =
      budget.income.total -
      budget.expenses.total -
      budget.debt.total -
      budget.savings.total;
    budget.totalLeftOver =
      (previousMonth?.totalLeftOver ?? 0) + budget.leftOver;

    budgetArray.push(budget);
    date = date.set({ month: date.month + 1 });
  }

  return budgetArray;
}
