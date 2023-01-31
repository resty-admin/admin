import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import type { ActiveOrderEntity } from "@graphql";
import type { IAction } from "@shared/ui/actions";

import { IOrder } from "../interfaces";

@Component({
	selector: "app-order",
	templateUrl: "./order.component.html",
	styleUrls: ["./order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent {
	@Input() order?: IOrder;
	@Input() actions?: IAction<ActiveOrderEntity>[];
}
