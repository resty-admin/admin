import { ChangeDetectionStrategy, Component } from "@angular/core";
import type { Observable } from "rxjs";
import { OrdersService } from "src/app/features/orders";

@Component({
	selector: "app-active-orders",
	templateUrl: "./active-orders.component.html",
	styleUrls: ["./active-orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrdersComponent {
	readonly orders$: Observable<any> = this._ordersService.orders$;
	readonly actions = this._ordersService.actions;

	constructor(private readonly _ordersService: OrdersService) {}
}
