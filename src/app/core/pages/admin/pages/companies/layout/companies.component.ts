import { ChangeDetectionStrategy, Component } from "@angular/core";
import { map } from "rxjs";

import { CompaniesService } from "../../../../../../features/companies";
import { CompaniesPageGQL } from "../graphql/companies";

@Component({
	selector: "app-companies",
	templateUrl: "./companies.component.html",
	styleUrls: ["./companies.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniesComponent {
	private readonly _companiesQuery = this._companiesPageGQL.watch({ skip: 0, take: 5 });
	readonly companies$ = this._companiesQuery.valueChanges.pipe(map((result) => result.data.companies.data));

	constructor(
		private readonly _companiesPageGQL: CompaniesPageGQL,
		private readonly _companiesService: CompaniesService
	) {}

	openCreateCompanyDialog() {
		this._companiesService.openCreateOrUpdateCompanyDialog().subscribe();
	}
}
