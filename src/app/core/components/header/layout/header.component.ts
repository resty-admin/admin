import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { ADMIN_ROUTES, COMPANY_ID, ORDER_ID, PLACE_ID } from "@shared/constants";
import type { ISimpleChanges } from "@shared/interfaces";
import { RouterService } from "@shared/modules/router";
import type { IAction } from "@shared/ui/actions";

import type { IHeaderActiveOrder, IHeaderUser } from "../interfaces";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnChanges {
	readonly orderId = ORDER_ID;
	@Output() burgerClicked = new EventEmitter();

	@Input() user?: IHeaderUser | null;
	@Input() isAsideOpen?: boolean | null;
	@Input() activeOrder?: IHeaderActiveOrder | null;

	@Input() profileActions?: IAction[] | null;

	activeOrderLink = "";

	constructor(private readonly _routerService: RouterService) {}

	ngOnChanges(changes: ISimpleChanges<HeaderComponent>) {
		if (changes.activeOrder && changes.activeOrder.currentValue) {
			const { companyId, placeId, orderId } = this._routerService.getParams();

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
