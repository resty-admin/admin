import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ShiftsService } from "@features/shift";
import type { ITableToSelect } from "@features/tables/ui/tables-select/interfaces";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { PLACE_ID } from "@shared/constants";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import { ConfirmationDialogComponent } from "@shared/ui/confirmation-dialog";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { lastValueFrom, map, ReplaySubject, switchMap } from "rxjs";

import { SHIFT_PAGE } from "../constants";

@UntilDestroy()
@Component({
	selector: "app-shift",
	templateUrl: "./shift.component.html",
	styleUrls: ["./shift.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShiftComponent implements OnInit {
	readonly shiftPage = SHIFT_PAGE;
	private readonly _selectedHallsSubject = new ReplaySubject<string[]>();
	readonly selectedHalls$ = this._selectedHallsSubject.asObservable();
	readonly halls$ = this._activatedRoute.data.pipe(map((data) => data["shift"]["halls"]));

	readonly tables$ = this._activatedRoute.data.pipe(
		map((data) => data["shift"]["tables"]),
		switchMap((tables) =>
			this.selectedHalls$.pipe(map((halls) => (tables || []).filter((table: any) => halls.includes(table.hall.id))))
		)
	);

	readonly activeShift$ = this._activatedRoute.data.pipe(map((data) => data["activeShift"]));

	selectedTables: ITableToSelect[] = [];
	selectedHalls: string[] = [];
	shiftId?: string;

	constructor(
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _shiftsService: ShiftsService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService,
		private readonly _changeDetectorRef: ChangeDetectorRef,
		private readonly _routerService: RouterService
	) {}

	async ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		this.activeShift$.pipe(untilDestroyed(this)).subscribe((activeShift) => {
			this.shiftId = activeShift?.id;
			this.selectedTables = activeShift?.tables || [];

			this._changeDetectorRef.detectChanges();
		});
	}

	setSelectedHalls(halls: string[]) {
		this._selectedHallsSubject.next(halls);
	}

	async createShift(tables?: ITableToSelect[]) {
		if (!tables) {
			return;
		}

		const place = this._routerService.getParams(PLACE_ID.slice(1));

		await lastValueFrom(
			this._shiftsService
				.createShift({ place, tables: tables.map((table) => table.id) })
				.pipe(
					this._toastrService.observe(
						this._i18nService.translate("title", {}, this.shiftPage),
						this._i18nService.translate("title", {}, this.shiftPage)
					)
				)
		);

		// await this._activeShiftQuery.refetch();
	}

	async updateShift(id: string, tables?: ITableToSelect[]) {
		if (!tables) {
			return;
		}

		await lastValueFrom(
			this._shiftsService
				.updateShift({ id, tables: tables.map((table) => table.id) })
				.pipe(
					this._toastrService.observe(
						this._i18nService.translate("title", {}, this.shiftPage),
						this._i18nService.translate("title", {}, this.shiftPage)
					)
				)
		);

		// await this._activeShiftQuery.refetch();
	}

	async closeShift(shiftId: string) {
		const config = {
			data: { title: this._i18nService.translate("title", {}, this.shiftPage), value: { label: "" } }
		};

		const isConfirmed = await lastValueFrom(this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$);

		if (!isConfirmed) {
			return;
		}

		await lastValueFrom(
			this._shiftsService
				.closeShift(shiftId)
				.pipe(
					this._toastrService.observe(
						this._i18nService.translate("title", {}, this.shiftPage),
						this._i18nService.translate("title", {}, this.shiftPage)
					)
				)
		);

		// await this._activeShiftQuery.refetch();
	}
}
