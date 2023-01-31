import { ChangeDetectionStrategy, Component } from "@angular/core";

import { NOTIFICATIONS_PAGE } from "../constants";

@Component({
	selector: "app-notifications",
	templateUrl: "./notifications.component.html",
	styleUrls: ["./notifications.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsComponent {
	readonly notificationsPage = NOTIFICATIONS_PAGE;
}
