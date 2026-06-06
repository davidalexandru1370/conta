import type { OrganizationService } from "./OrganizationService";

export class SrlService implements OrganizationService {
  computeTaxingFromGross(gross: number): number {
    return gross * 0.16;
  }
}
