import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-halls-select-skeleton",
	templateUrl: "./halls-select-skeleton.component.html",
	styleUrls: ["./halls-select-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallsSelectSkeletonComponent {}
