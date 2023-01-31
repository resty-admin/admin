import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-shift-skeleton",
	templateUrl: "./shift-skeleton.component.html",
	styleUrls: ["./shift-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShiftSkeletonComponent {}
