import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-tabs-skeleton",
	templateUrl: "./tabs-skeleton.component.html",
	styleUrls: ["./tabs-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsSkeletonComponent {}
