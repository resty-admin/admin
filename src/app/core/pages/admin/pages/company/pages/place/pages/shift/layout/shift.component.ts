import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ShiftsService } from "@features/shift";
import type { ITableToSelect } from "@features/tables/ui/tables-select/interfaces";
import { DialogService } from "@ngneat/dialog";
import { PLACE_ID } from "@shared/constants";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import { ConfirmationDialogComponent } from "@shared/ui/confirmation-dialog";
import { ToastrService } from "@shared/ui/toastr";
import { filter, map, shareReplay, Subject, switchMap, take } from "rxjs";

import { SHIFT_PAGE } from "../constants";
import { ShiftPageService } from "../services";

@Component({
	selector: "app-shift",
	templateUrl: "./shift.component.html",
	styleUrls: ["./shift.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShiftComponent {
	readonly shiftPage = SHIFT_PAGE;

	readonly selectedHallsSubject = new Subject<string[]>();
	readonly selectedHalls$ = this.selectedHallsSubject.asObservable();

	readonly halls$ = this._shiftPageService.shiftPage$.pipe(map((data) => data.halls.data));

	readonly tables$ = this._shiftPageService.shiftPage$.pipe(
		map((data) => data.tables.data),
		switchMap((tables) =>
			this.selectedHalls$.pipe(map((halls) => (tables || []).filter((table) => halls.includes(table.hall.id))))
		)
	);

	readonly activeShift$ = this._shiftPageService.activeShift$.pipe(shareReplay({ refCount: true }));

	selectedTables: ITableToSelect[] = [];

	constructor(
		private readonly _shiftPageService: ShiftPageService,
		private readonly _shiftsService: ShiftsService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService,
		private readonly _routerService: RouterService,
		private readonly _dialogService: DialogService
	) {}

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
				switchMap(() => this._shiftPageService.activeShiftQuery.refetch()),
				this._toastrService.observe(this._i18nService.translate("createShift")),
				take(1)
			)
			.subscribe();
	}

	updateShift(id: string, tables: ITableToSelect[]) {
		this._shiftsService
			.updateShift({ id, tables: (tables || []).map((table) => table.id) })
			.pipe(
				switchMap(() => this._shiftPageService.activeShiftQuery.refetch()),
				this._toastrService.observe(this._i18nService.translate("updateShift")),
				take(1)
			)
			.subscribe();
	}

	closeShift(shiftId: string) {
		this._dialogService
			.open(ConfirmationDialogComponent, {
				data: { title: this._i18nService.translate("title"), value: { label: shiftId } }
			})
			.afterClosed$.pipe(
				filter((isConfirmed) => Boolean(isConfirmed)),
				switchMap(() =>
					this._shiftsService.closeShift(shiftId).pipe(
						switchMap(() => this._shiftPageService.activeShiftQuery.refetch()),
						this._toastrService.observe(this._i18nService.translate("closeShift"))
					)
				),
				take(1)
			)
			.subscribe();
	}
}
