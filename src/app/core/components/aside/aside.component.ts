import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import type { UserEntity } from "@graphql";
import type { IAsidePage } from "@shared/interfaces";

import type { AdminCompaniesQuery, AdminPlacesQuery } from "../../graphql";

@Component({
	selector: "app-aside",
	templateUrl: "./aside.component.html",
	styleUrls: ["./aside.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideComponent {
	@Output() closeClicked = new EventEmitter();
	@Output() signOutClicked = new EventEmitter();
	@Output() addCompanyClicked = new EventEmitter();
	@Output() addPlaceClicked = new EventEmitter();
	@Output() editPlaceClicked = new EventEmitter();
	@Output() deletePlaceClicked = new EventEmitter();
	@Output() editCompanyClicked = new EventEmitter();
	@Output() deleteCompanyClicked = new EventEmitter();
	@Output() companyChanged = new EventEmitter<string>();
	@Output() placeChanged = new EventEmitter<string>();
	@Input() isAsideOpen: boolean | null = false;
	@Input() companies: AdminCompaniesQuery["companies"]["data"] = [];
	@Input() places: AdminPlacesQuery["places"]["data"] = [];
	@Input() user?: UserEntity | null;
	@Input() companyId?: string | null;
	@Input() placeId?: string | null;
	@Input() pages: IAsidePage[] | null = [];

	emitCompanyChanged(companyId: string) {
		this.companyChanged.emit(companyId);
	}

	emitPlaceChange(placeId: string) {
		this.placeChanged.emit(placeId);
	}

	emitSignOutClick() {
		this.signOutClicked.emit();
	}

	emitCloseClick() {
		this.closeClicked.emit();
	}

	emitAddCompanyClick() {
		this.addCompanyClicked.emit();
	}

	emitAddPlaceClick() {
		this.addPlaceClicked.emit();
	}

	emitEditPlaceClick(data: any) {
		this.editPlaceClicked.emit(data);
	}

	emitDeletePlaceClick(data: any) {
		this.deletePlaceClicked.emit(data);
	}

	emitEditCompanyClick(data: any) {
		this.editCompanyClicked.emit(data);
	}

	emitDeleteCompanyClick(data: any) {
		this.deleteCompanyClicked.emit(data);
	}
}
