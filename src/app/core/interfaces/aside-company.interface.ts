import type { CompanyEntity } from "@graphql";

export interface IAsideCompany {
	id: CompanyEntity["id"];
	name: CompanyEntity["name"];
}
