import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { filter, of, switchMap, take } from "rxjs";
import { ShiftsService } from "src/app/features/shift";

import { HallsService } from "../../../../../../../../../../features/halls";
import { TablesService } from "../../../../../../../../../../features/tables";
import { PLACE_ID } from "../../../../../../../../../../shared/constants";
import { RouterService } from "../../../../../../../../../../shared/modules/router";
import { ConfirmationDialogComponent } from "../../../../../../../../../../shared/ui/confirmation-dialog";
import { DialogService } from "../../../../../../../../../../shared/ui/dialog";
import { SHIFT_PAGE_I18N } from "../constants";

@UntilDestroy()
@Component({
	selector: "app-shift",
	templateUrl: "./shift.component.html",
	styleUrls: ["./shift.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShiftComponent implements OnInit {
	readonly shiftPageI18n = SHIFT_PAGE_I18N;
	readonly halls$ = of([]);
	readonly tables$ = of([]);
	readonly activeShiftGroup = this._formBuilder.group<any>({
		id: "",
		tables: []
	});

	readonly hallsControl = new FormControl();

	constructor(
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
		this.tables$
			.pipe(
				// switchMap(() => this._shiftsService.activeShift$),
				untilDestroyed(this)
			)
			.subscribe((activeShift: any) => {
				this.activeShiftGroup.setValue({
					id: activeShift?.id || "",
					tables: activeShift?.tables || []
				});
			});
	}

	createShift(tables: any[]) {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		this._shiftsService.createShift({ tables: tables.map(({ id }) => id), place }).subscribe();
	}

	updateShift(id: string, tables: any[]) {
		this._shiftsService.updateShift({ id, tables: tables.map(({ id }) => id) }).subscribe();
	}

	closeShift(shiftId: string) {
		const config = { data: { title: "Вы уверены, что хотите закрыть смену?", value: { label: "" } } };

		this._dialogService
			.open(ConfirmationDialogComponent, config)
			.afterClosed$.pipe(
				take(1),
				filter((isConfirmed) => Boolean(isConfirmed)),
				switchMap(() => this._shiftsService.closeShift(shiftId))
			)
			.subscribe();
	}
}
