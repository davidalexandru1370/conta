import type { OrganizationService } from "./OrganizationService";

export class MicroSrlService implements OrganizationService {
  computeTaxingFromGross(gross: number): number {
    return gross * 0.16;
  }
}
