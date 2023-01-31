import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-guests-skeleton",
	templateUrl: "./guests-skeleton.component.html",
	styleUrls: ["./guests-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestsSkeletonComponent {}
