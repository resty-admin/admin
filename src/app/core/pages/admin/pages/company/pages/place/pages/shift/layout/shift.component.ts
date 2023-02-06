import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AuthService } from "@features/auth";
import { ShiftsService } from "@features/shift";
import type { ITableToSelect } from "@features/tables/ui/tables-select/interfaces";
import { DialogService } from "@ngneat/dialog";
import { PLACE_ID } from "@shared/constants";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import { ConfirmationDialogComponent } from "@shared/ui/confirmation-dialog";
import { ToastrService } from "@shared/ui/toastr";
import { filter, map, shareReplay, Subject, switchMap, take } from "rxjs";

import { ActiveShiftGQL, ShiftPageGQL } from "../graphql";

@Component({
	selector: "app-shift",
	templateUrl: "./shift.component.html",
	styleUrls: ["./shift.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShiftComponent implements OnInit {
	readonly selectedHallsSubject = new Subject<string[]>();
	readonly selectedHalls$ = this.selectedHallsSubject.asObservable();

	private readonly _shiftPageQuery = this._shiftPageGQL.watch();
	private readonly _activeShiftQuery = this._activeShiftGQL.watch();

	readonly halls$ = this._shiftPageQuery.valueChanges.pipe(map((result) => result.data.halls.data));

	readonly tables$ = this._shiftPageQuery.valueChanges.pipe(
		map((result) => result.data.tables.data),
		switchMap((tables) =>
			this.selectedHalls$.pipe(map((halls) => (tables || []).filter((table) => halls.includes(table.hall.id))))
		)
	);

	readonly activeShift$ = this._activeShiftQuery.valueChanges.pipe(
		map((result) => result.data.shift),
		shareReplay({ refCount: true })
	);

	selectedTables: ITableToSelect[] = [];

	constructor(
		private readonly _shiftPageGQL: ShiftPageGQL,
		private readonly _activeShiftGQL: ActiveShiftGQL,
		private readonly _shiftsService: ShiftsService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService,
		private readonly _routerService: RouterService,
		private readonly _dialogService: DialogService,
		private readonly _authService: AuthService
	) {}

	async ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		this._authService.me$.pipe(take(1)).subscribe(async (user) => {
			await this._shiftPageQuery.setVariables({
				hallsFiltersArgs: [{ key: "place.id", operator: "=", value: placeId }],
				tablesFiltersArgs: [{ key: "hall.place.id", operator: "=", value: placeId }]
			});

			await this._activeShiftQuery.setVariables({
				filtersArgs: [
					{ key: "place.id", operator: "=", value: placeId },
					{ key: "waiter.id", operator: "=", value: user!.id }
				]
			});
		});
	}

	setSelectedHalls(halls: string[]) {
		this.selectedHallsSubject.next(halls);
	}

	createShift(tables: ITableToSelect[]) {
		this._shiftsService
			.createShift({
				place: this._routerService.getParams(PLACE_ID.slice(1)),
				tables: (tables || []).map((table) => table.id)
			})
			.pipe(
				switchMap(() => this._activeShiftQuery.refetch()),
				this._toastrService.observe(this._i18nService.translate("SHIFT.CREATE")),
				take(1)
			)
			.subscribe();
	}

	updateShift(id: string, tables: ITableToSelect[]) {
		this._shiftsService
			.updateShift({ id, tables: (tables || []).map((table) => table.id) })
			.pipe(
				switchMap(() => this._activeShiftQuery.refetch()),
				this._toastrService.observe(this._i18nService.translate("SHIFT.UPDATE")),
				take(1)
			)
			.subscribe();
	}

	closeShift(shiftId: string) {
		this._dialogService
			.open(ConfirmationDialogComponent, {
				data: { title: this._i18nService.translate("SHIFT.CONFIRM"), value: { label: shiftId } }
			})
			.afterClosed$.pipe(
				filter((isConfirmed) => Boolean(isConfirmed)),
				switchMap(() =>
					this._shiftsService.closeShift(shiftId).pipe(
						switchMap(() => this._activeShiftQuery.refetch()),
						this._toastrService.observe(this._i18nService.translate("SHIFT.CLOSE"))
					)
				),
				take(1)
			)
			.subscribe();
	}
}
