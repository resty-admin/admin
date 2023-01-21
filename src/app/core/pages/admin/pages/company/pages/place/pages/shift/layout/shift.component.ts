import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { HallsService } from "@features/halls";
import { ShiftsService } from "@features/shift";
import { TablesService } from "@features/tables";
import type { ITableToSelect } from "@features/tables/ui/tables-select/interfaces";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { PLACE_ID } from "@shared/constants";
import { RouterService } from "@shared/modules/router";
import { ConfirmationDialogComponent } from "@shared/ui/confirmation-dialog";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { lastValueFrom, map, ReplaySubject, switchMap, tap } from "rxjs";

import { SHIFT_PAGE_I18N } from "../constants";
import { ActiveShiftGQL, ShiftHallsGQL, ShiftTablesGQL } from "../graphql";

@UntilDestroy()
@Component({
	selector: "app-shift",
	templateUrl: "./shift.component.html",
	styleUrls: ["./shift.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShiftComponent implements OnInit {
	readonly shiftPageI18n = SHIFT_PAGE_I18N;
	private readonly _activeShiftQuery = this._activeShiftGQL.watch();
	private readonly _shiftHallsQuery = this._shiftHallsGQL.watch();
	private readonly _shiftTablesQuery = this._shiftTablesGQL.watch();
	private readonly _selectedHallsSubject = new ReplaySubject<string[]>();
	readonly selectedHalls$ = this._selectedHallsSubject.asObservable();
	readonly halls$ = this._shiftHallsQuery.valueChanges.pipe(
		map((result) => result.data.halls.data),
		tap((halls) => {
			this._selectedHallsSubject.next((halls || []).map((hall) => hall.id));
		})
	);

	readonly tables$ = this._shiftTablesQuery.valueChanges.pipe(
		map((result) => result.data.tables.data),
		switchMap((tables) =>
			this.selectedHalls$.pipe(map((halls) => (tables || []).filter((table) => halls.includes(table.hall.id))))
		)
	);

	readonly activeShift$ = this._activeShiftQuery.valueChanges.pipe(map((result) => result.data.activeShift));

	selectedTables: ITableToSelect[] = [];
	selectedHalls: string[] = [];
	shiftId?: string;

	constructor(
		private readonly _activeShiftGQL: ActiveShiftGQL,
		private readonly _shiftHallsGQL: ShiftHallsGQL,
		private readonly _shiftTablesGQL: ShiftTablesGQL,
		private readonly _shiftsService: ShiftsService,
		private readonly _hallsService: HallsService,
		private readonly _tablesService: TablesService,
		private readonly _routerService: RouterService,
		private readonly _formBuilder: FormBuilder,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _changeDetectorRef: ChangeDetectorRef
	) {}

	async ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		await this._shiftHallsQuery.setVariables({ filtersArgs: [{ key: "place.id", operator: "=", value: placeId }] });
		await this._shiftTablesQuery.setVariables({
			filtersArgs: [{ key: "hall.place.id", operator: "=", value: placeId }]
		});

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
				.pipe(this._toastrService.observe("Смена"))
		);

		await this._activeShiftQuery.refetch();
	}

	async updateShift(id: string, tables?: ITableToSelect[]) {
		if (!tables) {
			return;
		}

		await lastValueFrom(
			this._shiftsService
				.updateShift({ id, tables: tables.map((table) => table.id) })
				.pipe(this._toastrService.observe("Смена"))
		);

		await this._activeShiftQuery.refetch();
	}

	async closeShift(shiftId: string) {
		const config = { data: { title: "Вы уверены, что хотите закрыть смену?", value: { label: "" } } };

		const isConfirmed = await lastValueFrom(this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$);

		if (!isConfirmed) {
			return;
		}

		await lastValueFrom(this._shiftsService.closeShift(shiftId).pipe(this._toastrService.observe("Смена")));

		await this._activeShiftQuery.refetch();
	}
}
