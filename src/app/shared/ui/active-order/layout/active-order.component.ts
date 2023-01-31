import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { ACTIVE_ORDER } from "../constants";
import type { IActiveOrder } from "../interfaces";

@Component({
	selector: "app-active-order",
	templateUrl: "./active-order.component.html",
	styleUrls: ["./active-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrderComponent {
	@Input() activeOrder?: IActiveOrder | null;
	@Input() activeOrderLink: string = "";

	readonly activeOrderCmp = ACTIVE_ORDER;
}
