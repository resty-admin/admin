import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-access-page-skeleton",
	templateUrl: "./access-page-skeleton.component.html",
	styleUrls: ["./access-page-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccessPageSkeletonComponent {}
