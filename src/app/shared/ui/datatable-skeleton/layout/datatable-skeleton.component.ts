import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-datatable-skeleton",
	templateUrl: "./datatable-skeleton.component.html",
	styleUrls: ["./datatable-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatatableSkeletonComponent {}
