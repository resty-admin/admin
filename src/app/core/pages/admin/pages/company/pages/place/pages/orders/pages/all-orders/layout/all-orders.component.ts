import type { AfterViewInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, ViewChild } from "@angular/core";
import type { Observable } from "rxjs";
import { OrdersService } from "src/app/features/orders";
import type { IOrder } from "src/app/shared/interfaces";
import type { IDatatableColumn } from "src/app/shared/ui/datatable";

@Component({
	selector: "app-all-orders",
	templateUrl: "./all-orders.component.html",
	styleUrls: ["./all-orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllOrdersComponent implements AfterViewInit {
	@ViewChild("actionsTemplate", { static: true }) actionsTemplate!: any;

	columns: IDatatableColumn[] = [];

	readonly orders$: Observable<any> = this._ordersService.orders$;

	constructor(private readonly _ordersService: OrdersService) {}

	openOrderDialog(order?: Partial<IOrder>) {
		this._ordersService.openCreateOrUpdateOrderDialog(order).subscribe();
	}

	ngAfterViewInit() {
		this.columns = [
			{
				prop: "orderCode",
				name: "Код"
			},
			{
				prop: "date",
				name: "Дата"
			},
			{
				prop: "status",
				name: "Статус"
			},
			{
				cellTemplate: this.actionsTemplate
			}
		];
	}
}
