import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { PlacesService } from "@features/places";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ADMIN_ROUTES } from "@shared/constants";
import { RouterService } from "@shared/modules/router";
import { take } from "rxjs";

import { CompaniesPageGQL } from "../../companies/graphql";

@UntilDestroy()
@Component({
	selector: "app-connect-to-place",
	templateUrl: "./connect-to-place.component.html",
	styleUrls: ["./connect-to-place.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectToPlaceComponent implements OnInit, OnDestroy {
	readonly codeControl = new FormControl<number>();

	constructor(
		private readonly _placesService: PlacesService,
		private readonly _actionsService: ActionsService,
		private readonly _routerService: RouterService,
		private readonly _companiesPageGQL: CompaniesPageGQL
	) {}

	ngOnInit() {
		this.codeControl.valueChanges.pipe(untilDestroyed(this)).subscribe((code) => {
			this._actionsService.setAction({
				label: "CONNECT",
				disabled: code?.toString().length !== 4,
				func: () => this.connectToPlace()
			});
		});
	}

	connectToPlace() {
		this._placesService
			.addWaiterToPlace(Number.parseInt(this.codeControl.value.toString()))
			.pipe(take(1))
			.subscribe(async () => {
				await this._companiesPageGQL.watch().refetch();
				await this._routerService.navigateByUrl(ADMIN_ROUTES.COMPANIES.absolutePath);
			});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
