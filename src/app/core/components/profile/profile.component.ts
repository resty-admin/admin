import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import type { UserEntity } from "@graphql";
import { ADMIN_ROUTES } from "@shared/constants";

@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
	readonly adminRoutes = ADMIN_ROUTES;
	@Output() signOutClicked = new EventEmitter();
	@Output() closeClicked = new EventEmitter();
	@Input() user?: UserEntity | null;

	emitSignOutClick() {
		this.signOutClicked.emit();
	}

	emitCloseClick() {
		this.closeClicked.emit();
	}
}
