import type { CompanyEntity } from "@graphql";

export interface ICompanyForm {
	name: CompanyEntity["name"];
	logo: CompanyEntity["logo"];
}
