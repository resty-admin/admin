import { UserRoleEnum } from "@graphql";
import { ADMIN_ROUTES } from "@shared/constants";

export const ASIDE_PAGES = [
	{
		label: "STATISTIC",
		icon: "statistic",
		roles: [UserRoleEnum.Admin, UserRoleEnum.Manager],
		routerLink: ADMIN_ROUTES.STATISTIC.absolutePath
	},
	{
		label: "SHIFT",
		icon: "shift",
		roles: [UserRoleEnum.Admin, UserRoleEnum.Manager, UserRoleEnum.Waiter, UserRoleEnum.Hostess, UserRoleEnum.Hookah],
		routerLink: ADMIN_ROUTES.SHIFT.absolutePath
	},
	{
		label: "ORDERS",
		icon: "orders",
		roles: [UserRoleEnum.Admin, UserRoleEnum.Manager, UserRoleEnum.Waiter, UserRoleEnum.Hostess, UserRoleEnum.Hookah],
		routerLink: ADMIN_ROUTES.ORDERS.absolutePath
	},
	{
		label: "MENU",
		icon: "menu",
		roles: [UserRoleEnum.Admin, UserRoleEnum.Manager],
		routerLink: ADMIN_ROUTES.MENU.absolutePath
	},
	{
		label: "HALLS",
		icon: "halls",
		roles: [UserRoleEnum.Admin, UserRoleEnum.Manager],
		routerLink: ADMIN_ROUTES.HALLS.absolutePath
	},
	{
		label: "USERS",
		icon: "users",
		roles: [UserRoleEnum.Admin, UserRoleEnum.Manager],
		routerLink: ADMIN_ROUTES.USERS.absolutePath
	},
	{
		label: "COMMANDS",
		icon: "commands",
		roles: [UserRoleEnum.Admin, UserRoleEnum.Manager],
		routerLink: ADMIN_ROUTES.COMMANDS.absolutePath
	},
	{
		label: "WALLET",
		icon: "wallet",
		roles: [UserRoleEnum.Admin, UserRoleEnum.Manager],
		routerLink: ADMIN_ROUTES.WALLET.absolutePath
	},
	{
		label: "CONTRACT",
		icon: "contract",
		roles: [UserRoleEnum.Admin, UserRoleEnum.Manager],
		routerLink: ADMIN_ROUTES.CONTRACT.absolutePath
	},
	{
		label: "ACCOUNTING_SYSTEMS",
		icon: "accounting-systems",
		roles: [UserRoleEnum.Admin, UserRoleEnum.Manager],
		routerLink: ADMIN_ROUTES.ACCOUNTING_SYSTEMS.absolutePath
	},
	{
		label: "PAYMENT_SYSTEMS",
		icon: "payment-systems",
		roles: [UserRoleEnum.Admin, UserRoleEnum.Manager],
		routerLink: ADMIN_ROUTES.PAYMENT_SYSTEMS.absolutePath
	}
];
