import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import type { Observable } from "rxjs";
import { HallsService } from "src/app/features/halls";
import { PLACE_ID } from "src/app/shared/constants";
import type { IHall } from "src/app/shared/interfaces";
import { RouterService } from "src/app/shared/modules/router";
import type { IDatatableColumn } from "src/app/shared/ui/datatable";

@Component({
	selector: "app-halls",
	templateUrl: "./halls.component.html",
	styleUrls: ["./halls.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallsComponent {
	readonly columns: IDatatableColumn[] = [
		{
			prop: "name",
			name: "Name"
		}
	];

	readonly actions = this._hallsService.actions;

	readonly halls$: Observable<any> = this._hallsService.halls$;

	constructor(
		private readonly _hallsService: HallsService,
		private readonly _routerService: RouterService,
		private readonly _activatedRoute: ActivatedRoute
	) {}

	async navigateToHall(hall: Partial<IHall>) {
		await this._routerService.navigate([`${hall.id}/tables`], {
			relativeTo: this._activatedRoute
		});
	}

	openCreateHallDialog() {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		this._hallsService.openCreateOrUpdateHallDialog({ place }).subscribe();
	}

	openDeleteHallDialog(hall: IHall) {
		this._hallsService.openDeleteHallDialog(hall).subscribe();
	}
}
