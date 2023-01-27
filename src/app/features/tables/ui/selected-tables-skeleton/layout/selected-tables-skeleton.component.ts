import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-selected-tables-skeleton",
	templateUrl: "./selected-tables-skeleton.component.html",
	styleUrls: ["./selected-tables-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedTablesSkeletonComponent {}
