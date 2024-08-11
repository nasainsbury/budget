import { HouseConfig, HousePeriod } from "../types";

export function generateHouseBudget(config: HouseConfig) {
  const year = new Date().getFullYear();
  const budget: HousePeriod[] = [];

  const monthlyMorgateRate = config.mortgageRate / 12;
  const principal = config.housePrice * (1 - config.houseDepositPercentage);
  const totalPayments = config.mortgageTerm * 12;

  const monthlyPayment =
    (principal *
      (monthlyMorgateRate * Math.pow(1 + monthlyMorgateRate, totalPayments))) /
    (Math.pow(1 + monthlyMorgateRate, totalPayments) - 1);

  for (
    let elapsedYears = 0;
    elapsedYears < config.mortgageTerm + 1;
    elapsedYears++
  ) {
    const previousYear = budget[elapsedYears - 1];
    const previousSalary = previousYear ? previousYear.salary : config.salary;
    const previousSavings = previousYear
      ? previousYear.savings
      : config.startingBalance -
        config.housePrice * config.houseDepositPercentage;
    const previousBalance = previousYear
      ? previousYear.houseRemainingBalance
      : config.housePrice * (1 - config.houseDepositPercentage);
    const previousHouseValue = previousYear
      ? previousYear.houseValue
      : config.housePrice;

    const salary = increaseValue(previousSalary, config.salaryIncrease);

    // Calculate Interset
    const savingsPerMonth = salary * config.savingsPercent;
    let savings = previousSavings;
    let savingsInterestAmount = 0;

    // Mortgage
    let remainingBalance = previousBalance;
    let yearlyMorgateInterestPaid = 0;

    for (let month = 1; month < 12; month++) {
      // Savings
      const monthlyInterest = savings * (config.savingsInterest / 12);
      savings += monthlyInterest;
      savings += savingsPerMonth;
      savingsInterestAmount += monthlyInterest;

      // Morgate
      remainingBalance -= monthlyPayment;
      const monthlyMortgageInterest = remainingBalance * monthlyMorgateRate;
      yearlyMorgateInterestPaid += monthlyMortgageInterest;
      remainingBalance += monthlyMortgageInterest;
    }

    const period: HousePeriod = {
      year: year + elapsedYears,
      salary: increaseValue(previousSalary, config.salaryIncrease),
      houseValue: increaseValue(
        previousHouseValue,
        config.houseValueAppreciate
      ),
      mortgagePayment: monthlyPayment,
      houseRemainingBalance: remainingBalance,
      interestPaid: yearlyMorgateInterestPaid,
      savings: savings,
      realTermsSavings: savings * Math.pow(1 - config.inflation, elapsedYears),
      savingsInterestAccrued: savingsInterestAmount,
      realTermsInterest:
        savingsInterestAmount * Math.pow(1 - config.inflation, elapsedYears),
    };

    budget.push(period);
  }

  return budget;
}

function increaseValue(value: number, percent: number) {
  return value * (1 + percent);
}
