import { ADMIN_ROUTES } from "src/app/shared/constants";

export const ASIDE_PAGES = [
	{
		label: "statistic",
		icon: "dashboard",
		routerLink: ADMIN_ROUTES.STATISTIC.absolutePath
	},
	{
		label: "shift",
		icon: "shift",
		routerLink: ADMIN_ROUTES.SHIFT.absolutePath
	},
	{
		label: "orders",
		icon: "orders",
		routerLink: ADMIN_ROUTES.ORDERS.absolutePath
	},
	{
		label: "menu",
		icon: "menu",
		routerLink: ADMIN_ROUTES.MENU.absolutePath
	},
	{
		label: "halls",
		icon: "halls",
		routerLink: ADMIN_ROUTES.HALLS.absolutePath
	},
	{
		label: "users",
		icon: "users",
		routerLink: ADMIN_ROUTES.USERS.absolutePath
	},
	{
		label: "commands",
		icon: "commands",
		routerLink: ADMIN_ROUTES.COMMANDS.absolutePath
	},
	{
		label: "wallet",
		icon: "wallet",
		routerLink: ADMIN_ROUTES.WALLET.absolutePath
	},
	{
		label: "contract",
		icon: "contract",
		routerLink: ADMIN_ROUTES.CONTRACT.absolutePath
	},
	{
		label: "accounting_systems",
		icon: "accounting-systems",
		routerLink: ADMIN_ROUTES.ACCOUNTING_SYSTEMS.absolutePath
	},
	{
		label: "payment_systems",
		icon: "payment-systems",
		routerLink: ADMIN_ROUTES.PAYMENT_SYSTEMS.absolutePath
	}
];
