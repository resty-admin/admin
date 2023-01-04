import { ADMIN_ROUTES } from "../../../../shared/routes";

export const PAGES = [
	{
		label: "DASHBOARD",
		icon: "dashboard",
		routerLink: ADMIN_ROUTES.DASHBOARD.absolutePath
	},
	{
		label: "SHIFT",
		icon: "shift",
		routerLink: ADMIN_ROUTES.SHIFT.absolutePath
	},
	{
		label: "ORDERS",
		icon: "orders",
		routerLink: ADMIN_ROUTES.ORDERS.absolutePath
	},
	{
		label: "MENU",
		icon: "menu",
		routerLink: ADMIN_ROUTES.MENU.absolutePath
	},
	{
		label: "HALLS",
		icon: "halls",
		routerLink: ADMIN_ROUTES.HALLS.absolutePath
	},
	{
		label: "USERS",
		icon: "users",
		routerLink: ADMIN_ROUTES.USERS.absolutePath
	},
	{
		label: "COMMANDS",
		icon: "commands",
		routerLink: ADMIN_ROUTES.COMMANDS.absolutePath
	},
	{
		label: "WALLET",
		icon: "wallet",
		routerLink: ADMIN_ROUTES.WALLET.absolutePath
	},
	{
		label: "CONTRACT",
		icon: "contract",
		routerLink: ADMIN_ROUTES.CONTRACT.absolutePath
	},
	{
		label: "ACCOUNTING_SYSTEMS",
		icon: "accounting-systems",
		routerLink: ADMIN_ROUTES.ACCOUNTING_SYSTEMS.absolutePath
	},
	{
		label: "PAYMENT_SYSTEMS",
		icon: "payment-systems",
		routerLink: ADMIN_ROUTES.PAYMENT_SYSTEMS.absolutePath
	}
];
