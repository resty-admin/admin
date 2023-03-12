import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import type { UserEntity } from "@graphql";
import { ADMIN_ROUTES, COMPANY_ID, ORDER_ID, PLACE_ID } from "@shared/constants";
import type { ISimpleChanges } from "@shared/interfaces";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import type { IAction } from "@shared/ui/actions";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnChanges {
	@Output() burgerClicked = new EventEmitter();
	@Output() signOutClicked = new EventEmitter();
	@Input() user?: UserEntity | null;
	@Input() isAsideOpen: boolean = false;
	@Input() activeOrder?: any;

	readonly orderId = ORDER_ID;

	activeOrderLink = "";

	readonly userActions: IAction[] = [
		{
			label: "PROFILE",
			icon: "profile",
			func: () => this._routerService.navigateByUrl(ADMIN_ROUTES.PROFILE.absolutePath)
		},
		{
			label: "NOTIFICATIONS",
			icon: "notifications",
			func: () => this._routerService.navigateByUrl(ADMIN_ROUTES.NOTIFICATIONS.absolutePath)
		},
		{
			label: "EXIT",
			icon: "exit",
			func: () => this.signOutClicked.emit()
		}
	];

	constructor(readonly sharedService: SharedService, private readonly _routerService: RouterService) {}

	ngOnChanges(changes: ISimpleChanges<HeaderComponent>) {
		if (changes.activeOrder && changes.activeOrder.currentValue) {
			const { companyId, placeId, orderId } = this._routerService.getParams() || {};

			this.activeOrderLink = ADMIN_ROUTES.ACTIVE_ORDER.absolutePath
				.replace(COMPANY_ID, companyId)
				.replace(PLACE_ID, placeId)
				.replace(ORDER_ID, orderId);
		}
	}

	emitBurgerClick() {
		this.burgerClicked.emit();
	}
}
