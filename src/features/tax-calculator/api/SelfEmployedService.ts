import type { OrganizationService } from "./OrganizationService";

export class SelfEmployedService implements OrganizationService {
  computeTaxingFromGross(gross: number): number {
    return gross * 0.1;
  }
}
