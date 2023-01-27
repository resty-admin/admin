import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-table-skeleton",
	templateUrl: "./table-skeleton.component.html",
	styleUrls: ["./table-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableSkeletonComponent {}
