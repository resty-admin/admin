import { ChangeDetectionStrategy, Component } from "@angular/core";

import { CompaniesService } from "../../../../../../features/companies";

@Component({
	selector: "app-companies",
	templateUrl: "./companies.component.html",
	styleUrls: ["./companies.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniesComponent {
	readonly companies$ = this._companiesService.companies$;

	constructor(private readonly _companiesService: CompaniesService) {}

	openCreateCompanyDialog() {
		this._companiesService.openCreateOrUpdateCompanyDialog().subscribe();
	}
}
