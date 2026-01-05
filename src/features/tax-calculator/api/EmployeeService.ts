import type { Income } from "../../../domain/types/Income";
import type { NetSalary } from "../types/NetSalary";

export type IEmployeeService = {
  computeNetSalaryFromGross: (income: Income, minWage: number) => NetSalary;
  getPersonalDeduction: (income: number, minWage: number) => number;
};

export class EmployeeService implements IEmployeeService {
  computeNetSalaryFromGross(income: Income, minWage: number): NetSalary {
    const { gross, casRate, cassRate, taxRate } = income;
    const cas: number = gross * casRate;
    const cass: number = gross * cassRate;
    const taxable: number = Math.max(0, gross - cas - cass);
    const personalDeduction: number =
      gross > minWage ? this.getPersonalDeduction(gross, minWage) : 0;
    const deducted: number = gross * (personalDeduction / 100.0);
    const incomeTax = Math.max(0, (taxable - deducted) * taxRate);
    const net = gross - cas - cass - incomeTax;
    const taxes: NetSalary = {
      cas: cas,
      cass: cass,
      taxable: taxable,
      personalDeduction: personalDeduction,
      incomeTax: incomeTax,
      net: net,
    };
    return taxes;
  }

  getPersonalDeduction(income: number, minWage: number): number {
    const maxThreshold: number = minWage + 2000;
    if (income > maxThreshold) {
      return 0;
    }

    const interval: number = Math.floor((income - minWage) / 50);
    const deduction: number = 20.0 - 0.5 * interval;
    return deduction;
  }
}
