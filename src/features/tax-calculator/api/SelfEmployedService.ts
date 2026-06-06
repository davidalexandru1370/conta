import type { OrganizationService } from "./OrganizationService";

const CAS_RATE = 0.25;
const CASS_RATE = 0.1;
const INCOME_TAX_RATE = 0.1;

export class SelfEmployedService implements OrganizationService {
  computeTaxingFromGross(gross: number): number {
    const taxableIncome = Math.max(0, gross);
    const cas = taxableIncome * CAS_RATE;
    const cass = taxableIncome * CASS_RATE;
    const incomeTaxBase = Math.max(0, taxableIncome - cas - cass);
    const incomeTax = incomeTaxBase * INCOME_TAX_RATE;

    return taxableIncome - cas - cass - incomeTax;
  }
}
