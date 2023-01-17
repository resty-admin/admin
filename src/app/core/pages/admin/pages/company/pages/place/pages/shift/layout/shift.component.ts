import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { lastValueFrom, map } from "rxjs";
import { ShiftsService } from "src/app/features/shift";

import { HallsService } from "../../../../../../../../../../features/halls";
import { TablesService } from "../../../../../../../../../../features/tables";
import { PLACE_ID } from "../../../../../../../../../../shared/constants";
import { RouterService } from "../../../../../../../../../../shared/modules/router";
import { ConfirmationDialogComponent } from "../../../../../../../../../../shared/ui/confirmation-dialog";
import { DialogService } from "../../../../../../../../../../shared/ui/dialog";
import { SHIFT_PAGE_I18N } from "../constants";
import { ShiftPageGQL } from "../graphql/shift-page";

@UntilDestroy()
@Component({
	selector: "app-shift",
	templateUrl: "./shift.component.html",
	styleUrls: ["./shift.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShiftComponent implements OnInit {
	readonly shiftPageI18n = SHIFT_PAGE_I18N;
	private readonly _shiftPageQuery = this._shiftPageGQL.watch();
	readonly shiftPage$ = this._shiftPageQuery.valueChanges;

	readonly tables$ = this.shiftPage$.pipe(map((result) => result.data.tables.data));

	readonly halls$ = this.shiftPage$.pipe(map((result) => result.data.halls.data));
	readonly activeShift$ = this.shiftPage$.pipe(map((result) => result.data.activeShift));

	readonly activeShiftGroup = this._formBuilder.group<any>({
		id: "",
		tables: []
	});

	readonly hallsControl = new FormControl();

	constructor(
		private readonly _shiftPageGQL: ShiftPageGQL,
		private readonly _shiftsService: ShiftsService,
		private readonly _hallsService: HallsService,
		private readonly _tablesService: TablesService,
		private readonly _routerService: RouterService,
		private readonly _formBuilder: FormBuilder,
		private readonly _dialogService: DialogService
	) {}

	get formValue() {
		return this.activeShiftGroup.value as any;
	}

	ngOnInit() {
		this.activeShift$.pipe(untilDestroyed(this)).subscribe((activeShift) => {
			this.activeShiftGroup.setValue({
				id: activeShift?.id || "",
				tables: activeShift?.tables || []
			});
		});
	}

	async createShift(tables: any[]) {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		await lastValueFrom(this._shiftsService.createShift({ tables: tables.map(({ id }) => id), place }));
	}

	async updateShift(id: string, tables: any[]) {
		await lastValueFrom(this._shiftsService.updateShift({ id, tables: tables.map(({ id }) => id) }));
	}

	async closeShift(shiftId: string) {
		const config = { data: { title: "Вы уверены, что хотите закрыть смену?", value: { label: "" } } };

		const isConfirmed = await lastValueFrom(this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$);

		if (!isConfirmed) {
			return;
		}

		await lastValueFrom(this._shiftsService.closeShift(shiftId));
	}
}
