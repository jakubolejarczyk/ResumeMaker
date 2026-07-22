export interface CompanyEntityModel {
  id: number;
  companyName: string;
  city: string;
  country: string;
  includeConsentClause: boolean;
  customConsentClause: string | null;
  recruitmentStatus: string;
  userId: number;
}
