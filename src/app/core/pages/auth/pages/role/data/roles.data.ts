import { UserRoleEnum } from "@graphql";

export const ROLES_DATA = [
	{
		label: "MANAGER_LABEL",
		value: UserRoleEnum.Manager,
		image: "manager",
		description: "MANAGER_DESCRIPTION"
	},
	{
		label: "HOSTESS_LABEL",
		value: UserRoleEnum.Hostess,
		image: "hostess",
		description: "HOSTESS_DESCRIPTION"
	},
	{
		label: "WAITER_LABEL",
		value: UserRoleEnum.Waiter,
		image: "waiter",
		description: "WALTER_DESCRIPTION"
	},
	{
		label: "HOOKAH_LABEL",
		value: UserRoleEnum.Hookah,
		image: "hookah",
		description: "HOOKAH_DESCRIPTION"
	}
];
