export type OrganizationService = {
  // Computes the net amount left after applicable taxes.
  computeTaxingFromGross: (gross: number) => number;
};
