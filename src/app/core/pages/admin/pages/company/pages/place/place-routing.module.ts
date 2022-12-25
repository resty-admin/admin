import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";
import { ADMIN_ROUTES as SHARED_ADMIN_ROUTES } from "src/app/shared/routes";

import { PlaceComponent } from "./layout/place.component";

export const PLACE_ROUTES: Route[] = [
	{
		path: "",
		component: PlaceComponent,
		children: [
			{
				...SHARED_ADMIN_ROUTES.DASHBOARD,
				loadChildren: () => import("./pages/dashboard/dashboard.module").then((m) => m.DashboardModule)
			},
			{
				...SHARED_ADMIN_ROUTES.SHIFT,
				loadChildren: () => import("./pages/shift/shift.module").then((m) => m.ShiftModule)
			},
			{
				...SHARED_ADMIN_ROUTES.COMMANDS,
				loadChildren: () => import("./pages/commands/commands.module").then((m) => m.CommandsModule)
			},
			{
				...SHARED_ADMIN_ROUTES.CONTRACT,
				loadChildren: () => import("./pages/contract/contract.module").then((m) => m.ContractModule)
			},
			{
				...SHARED_ADMIN_ROUTES.WALLET,
				loadChildren: () => import("./pages/wallet/wallet.module").then((m) => m.WalletModule)
			},
			{
				...SHARED_ADMIN_ROUTES.MENU,
				loadChildren: () => import("./pages/menu/menu.module").then((m) => m.MenuModule)
			},
			{
				...SHARED_ADMIN_ROUTES.HALLS,
				loadChildren: () => import("./pages/halls/halls.module").then((m) => m.HallsModule)
			},
			{
				...SHARED_ADMIN_ROUTES.HALL,
				pathMatch: "full",
				redirectTo: SHARED_ADMIN_ROUTES.TABLES.path
			},
			{
				...SHARED_ADMIN_ROUTES.TABLES,
				loadChildren: () => import("./pages/tables/tables.module").then((m) => m.TablesModule)
			},
			{
				...SHARED_ADMIN_ROUTES.ORDERS,
				loadChildren: () => import("./pages/orders/orders.module").then((m) => m.OrdersModule)
			},
			{
				...SHARED_ADMIN_ROUTES.ORDER,
				loadChildren: () => import("./pages/orders/orders.module").then((m) => m.OrdersModule)
			},
			{
				...SHARED_ADMIN_ROUTES.ACCOUNTING_SYSTEMS,
				loadChildren: () =>
					import("./pages/accounting-systems/accounting-systems.module").then((m) => m.AccountingSystemsModule)
			},
			{
				...SHARED_ADMIN_ROUTES.PAYMENT_SYSTEMS,
				loadChildren: () => import("./pages/payment-systems/payment-systems.module").then((m) => m.PaymentSystemsModule)
			},
			{
				...SHARED_ADMIN_ROUTES.USERS,
				loadChildren: () => import("./pages/users/users.module").then((m) => m.UsersModule)
			},
			{
				path: "**",
				redirectTo: SHARED_ADMIN_ROUTES.DASHBOARD.path
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(PLACE_ROUTES)],
	exports: [RouterModule]
})
export class PlaceRoutingModule {}
