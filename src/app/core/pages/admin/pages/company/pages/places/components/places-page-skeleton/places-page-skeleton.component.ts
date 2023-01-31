import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-places-page-skeleton",
	templateUrl: "./places-page-skeleton.component.html",
	styleUrls: ["./places-page-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacesPageSkeletonComponent {}
