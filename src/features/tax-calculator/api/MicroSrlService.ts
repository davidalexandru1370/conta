import type { OrganizationService } from "./OrganizationService";

const MICRO_INCOME_TAX_RATE = 0.01;
const DIVIDEND_TAX_RATE = 0.1;

export class MicroSrlService implements OrganizationService {
  computeTaxingFromGross(gross: number): number {
    const taxableRevenue = Math.max(0, gross);
    const microIncomeTax = taxableRevenue * MICRO_INCOME_TAX_RATE;
    const distributableProfit = taxableRevenue - microIncomeTax;
    const dividendTax = distributableProfit * DIVIDEND_TAX_RATE;

    // Simplified model: assumes full distribution as dividends.
    return distributableProfit - dividendTax;
  }
}
