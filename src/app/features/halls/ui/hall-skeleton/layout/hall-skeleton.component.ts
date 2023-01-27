import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-hall-skeleton",
	templateUrl: "./hall-skeleton.component.html",
	styleUrls: ["./hall-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallSkeletonComponent {}
