import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { filter, from, switchMap, take } from "rxjs";
import type { IHall } from "src/app/shared/interfaces";
import type { IDatatableColumn } from "src/app/shared/ui/datatable";
import { DialogService } from "src/app/shared/ui/dialog";
import { ToastrService } from "src/app/shared/ui/toastr";

import { PLACE_ID } from "../../../../../../../../../../shared/constants";
import { HallsService } from "../../../../../../../../../../shared/modules/halls";
import { RouterService } from "../../../../../../../../../../shared/modules/router";
import type { IAction } from "../../../../../../../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../../../../../../../shared/ui/confirmation-dialog";
import { HallDialogComponent } from "../components";

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

	readonly actions: IAction<IHall>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (hall?: IHall) => this.openHallDialog(hall)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (hall?: IHall) => {
				if (!hall) {
					return;
				}

				this.openDeleteHallDialog(hall);
			}
		}
	];

	readonly halls$ = this._hallsService.halls$;

	constructor(
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _routerService: RouterService,
		private readonly _hallsService: HallsService,
		private readonly _activatedRoute: ActivatedRoute
	) {}

	async navigateToHall(hall: Partial<IHall>) {
		await this._routerService.navigate([`${hall.id}/tables`], {
			relativeTo: this._activatedRoute
		});
	}

	openHallDialog(hall?: Partial<IHall>) {
		this._dialogService
			.open(HallDialogComponent, { data: hall })
			.afterClosed$.pipe(
				take(1),
				filter((hall) => Boolean(hall)),
				switchMap((hall: Partial<IHall>) =>
					hall.id
						? this._hallsService.updateHall(hall.id, hall).pipe(take(1), this._toastrService.observe("Залы"))
						: this._hallsService
								.createHall({
									...hall,
									place: this._routerService.getParams(PLACE_ID.slice(1))
								} as unknown as any)
								.pipe(take(1), this._toastrService.observe("Залы"))
				),
				switchMap(() => from(this._hallsService.refetchHalls()))
			)
			.subscribe();
	}

	openDeleteHallDialog(hall: Partial<IHall>) {
		this._dialogService
			.open(ConfirmationDialogComponent, {
				data: {
					title: "Вы уверены, что хотите удалить зал?",
					value: hall
				}
			})
			.afterClosed$.pipe(
				take(1),
				filter((hall) => Boolean(hall)),
				switchMap((hall) => this._hallsService.deleteHall(hall.id))
			)
			.subscribe();
	}
}
