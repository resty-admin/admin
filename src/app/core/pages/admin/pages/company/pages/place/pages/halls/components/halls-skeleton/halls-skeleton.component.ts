import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-halls-skeleton",
	templateUrl: "./halls-skeleton.component.html",
	styleUrls: ["./halls-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallsSkeletonComponent {}
