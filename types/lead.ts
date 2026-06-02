/**
 * Lead form payload and API contract.
 */

export interface LeadFormPayload {
  project_slug: string;
  name: string;
  phone: string;
  email?: string;
  notes?: string;
  source?: string;
}
