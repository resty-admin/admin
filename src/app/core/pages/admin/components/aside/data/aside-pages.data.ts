import { ADMIN_ROUTES } from "src/app/shared/constants";

import { UserRoleEnum } from "../../../../../../../graphql";

export const ASIDE_PAGES = [
	{
		label: "statistic",
		icon: "statistic",
		roles: [UserRoleEnum.Admin, UserRoleEnum.Manager],
		routerLink: ADMIN_ROUTES.STATISTIC.absolutePath
	},
	{
		label: "shift",
		icon: "shift",
		roles: [UserRoleEnum.Admin, UserRoleEnum.Manager, UserRoleEnum.Waiter, UserRoleEnum.Hostess, UserRoleEnum.Hookah],
		routerLink: ADMIN_ROUTES.SHIFT.absolutePath
	},
	{
		label: "orders",
		icon: "orders",
		roles: [UserRoleEnum.Admin, UserRoleEnum.Manager, UserRoleEnum.Waiter, UserRoleEnum.Hostess, UserRoleEnum.Hookah],
		routerLink: ADMIN_ROUTES.ORDERS.absolutePath
	},
	{
		label: "menu",
		icon: "menu",
		roles: [UserRoleEnum.Admin, UserRoleEnum.Manager],
		routerLink: ADMIN_ROUTES.MENU.absolutePath
	},
	{
		label: "halls",
		icon: "halls",
		roles: [UserRoleEnum.Admin, UserRoleEnum.Manager],
		routerLink: ADMIN_ROUTES.HALLS.absolutePath
	},
	{
		label: "users",
		icon: "users",
		roles: [UserRoleEnum.Admin, UserRoleEnum.Manager],
		routerLink: ADMIN_ROUTES.USERS.absolutePath
	},
	{
		label: "commands",
		icon: "commands",
		roles: [UserRoleEnum.Admin, UserRoleEnum.Manager],
		routerLink: ADMIN_ROUTES.COMMANDS.absolutePath
	},
	{
		label: "wallet",
		icon: "wallet",
		roles: [UserRoleEnum.Admin, UserRoleEnum.Manager],
		routerLink: ADMIN_ROUTES.WALLET.absolutePath
	},
	{
		label: "contract",
		icon: "contract",
		roles: [UserRoleEnum.Admin, UserRoleEnum.Manager],
		routerLink: ADMIN_ROUTES.CONTRACT.absolutePath
	},
	{
		label: "accounting_systems",
		icon: "accounting-systems",
		roles: [UserRoleEnum.Admin, UserRoleEnum.Manager],
		routerLink: ADMIN_ROUTES.ACCOUNTING_SYSTEMS.absolutePath
	},
	{
		label: "payment_systems",
		icon: "payment-systems",
		roles: [UserRoleEnum.Admin, UserRoleEnum.Manager],
		routerLink: ADMIN_ROUTES.PAYMENT_SYSTEMS.absolutePath
	}
];
