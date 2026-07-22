export interface CompanyEntityModel {
  id: number;
  companyName: string;
  city: string;
  country: string;
  includeConsentClause: boolean;
  customConsentClause?: string;
  recruitmentStatus: string;
  userId: number;
}
