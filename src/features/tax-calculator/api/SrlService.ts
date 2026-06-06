import type { OrganizationService } from "./OrganizationService";

const PROFIT_TAX_RATE = 0.16;
const DIVIDEND_TAX_RATE = 0.1;

export class SrlService implements OrganizationService {
  computeTaxingFromGross(gross: number): number {
    const taxableProfit = Math.max(0, gross);
    const profitTax = taxableProfit * PROFIT_TAX_RATE;
    const distributableProfit = taxableProfit - profitTax;
    const dividendTax = distributableProfit * DIVIDEND_TAX_RATE;

    // Simplified model: assumes profit is fully distributed as dividends.
    return distributableProfit - dividendTax;
  }
}
