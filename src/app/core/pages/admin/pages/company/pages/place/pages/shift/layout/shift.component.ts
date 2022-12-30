import { ChangeDetectionStrategy, Component } from "@angular/core";
import { of } from "rxjs";
import { ShiftsService } from "src/app/features/shift";

@Component({
	selector: "app-shift",
	templateUrl: "./shift.component.html",
	styleUrls: ["./shift.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShiftComponent {
	readonly selectedTables: any = [];

	readonly halls$: any = of([]);
	readonly tables$: any = of([]);

	constructor(private readonly _shiftsService: ShiftsService) {}
}
