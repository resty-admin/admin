import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-guests-page-skeleton",
	templateUrl: "./guests-page-skeleton.component.html",
	styleUrls: ["./guests-page-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestsPageSkeletonComponent {}
