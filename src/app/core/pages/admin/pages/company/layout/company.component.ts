import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
	selector: "app-company",
	templateUrl: "./company.component.html",
	styleUrls: ["./company.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyComponent {}
