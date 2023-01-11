import { ChangeDetectionStrategy, Component } from "@angular/core";
import { map, take } from "rxjs";

import { CompaniesService } from "../../../../../../features/companies";

@Component({
	selector: "app-companies",
	templateUrl: "./companies.component.html",
	styleUrls: ["./companies.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniesComponent {
	readonly companies$ = this._companiesService.companiesQuery.valueChanges.pipe(
		map((result) => result.data.companies.data)
	);

	constructor(private readonly _companiesService: CompaniesService) {}

	openCreateCompanyDialog() {
		return this._companiesService.openCreateCompanyDialog().pipe(take(1)).subscribe();
	}
}
