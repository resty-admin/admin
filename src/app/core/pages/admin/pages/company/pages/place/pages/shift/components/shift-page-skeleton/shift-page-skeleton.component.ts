import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-shift-page-skeleton",
	templateUrl: "./shift-page-skeleton.component.html",
	styleUrls: ["./shift-page-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShiftPageSkeletonComponent {}
