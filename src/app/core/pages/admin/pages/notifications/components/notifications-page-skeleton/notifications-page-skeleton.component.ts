import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-notifications-page-skeleton",
	templateUrl: "./notifications-page-skeleton.component.html",
	styleUrls: ["./notifications-page-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsPageSkeletonComponent {}
