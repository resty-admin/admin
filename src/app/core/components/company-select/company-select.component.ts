import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import type { UserEntity } from "@graphql";

import type { AdminCompaniesQuery } from "../../graphql";

@Component({
	selector: "app-company-select",
	templateUrl: "./company-select.component.html",
	styleUrls: ["./company-select.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanySelectComponent {
	@Output() addCompanyClicked = new EventEmitter();
	@Output() editCompanyClicked = new EventEmitter();
	@Output() deleteCompanyClicked = new EventEmitter();
	@Output() companyChanged = new EventEmitter<string>();
	@Input() companies: AdminCompaniesQuery["companies"]["data"] = [];
	@Input() companyId?: string | null;
	@Input() user?: UserEntity | null;

	emitAddCompanyClick() {
		this.addCompanyClicked.emit();
	}

	emitCompanyChange(companyId: string) {
		this.companyChanged.emit(companyId);
	}

	emitEditClick(companyId: any) {
		this.editCompanyClicked.emit((this.companies || []).find(({ id }) => id === companyId));
	}

	emitDeleteClick(companyId: any) {
		this.deleteCompanyClicked.emit((this.companies || []).find(({ id }) => id === companyId));
	}
}
