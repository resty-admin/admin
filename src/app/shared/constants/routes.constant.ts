import {
	ACCOUNTING_SYSTEM_ID,
	ATTRIBUTE_ID,
	CATEGORY_ID,
	COMMAND_ID,
	COMPANY_ID,
	DYNAMIC_TOKEN,
	HALL_ID,
	ORDER_ID,
	PAYMENT_SYSTEM_ID,
	PLACE_ID,
	PRODUCT_ID,
	USER_ID
} from "../constants";

export const ADMIN_ROUTES = {
	AUTH: {
		path: "auth",
		absolutePath: "/auth"
	},
	SIGN_IN: {
		path: "sign-in",
		absolutePath: "/auth/sign-in"
	},
	ROLE: {
		path: "role",
		absolutePath: "/auth/role"
	},
	SIGN_UP: {
		path: "sign-up",
		absolutePath: "/auth/sign-up"
	},
	FORGOT_PASSWORD: {
		path: "forgot-password",
		absolutePath: "/auth/forgot-password"
	},
	RESET_PASSWORD: {
		path: `reset-password/${DYNAMIC_TOKEN}`,
		absolutePath: `/auth/reset-password/${DYNAMIC_TOKEN}`
	},
	VERIFICATION_CODE: {
		path: `verification-code/${DYNAMIC_TOKEN}`,
		absolutePath: `/auth/verification-code/${DYNAMIC_TOKEN}`
	},
	TELEGRAM: {
		path: "telegram",
		absolutePath: "/auth/telegram"
	},
	GOOGLE: {
		path: "google",
		absolutePath: "/auth/google"
	},
	ADMIN: {
		path: "",
		absolutePath: "/"
	},
	CONNECT_TO_PLACE: {
		path: "connect-to-place",
		absolutePath: "/connect-to-place"
	},
	PROFILE: {
		path: "profile",
		absolutePath: "/profile"
	},
	NOTIFICATIONS: {
		path: "notifications",
		absolutePath: "/notifications"
	},
	COMPANIES: {
		path: "companies",
		absolutePath: "/companies"
	},
	COMPANY: {
		path: `companies/${COMPANY_ID}`,
		absolutePath: `/companies/${COMPANY_ID}`
	},
	PLACES: {
		path: `places`,
		absolutePath: `/companies/${COMPANY_ID}/places`
	},
	PLACE: {
		path: `places/${PLACE_ID}`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}`
	},
	STATISTIC: {
		path: `statistic`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/statistic`
	},
	USERS: {
		path: `users`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/users`
	},
	USER: {
		path: `users/${USER_ID}`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/users/${USER_ID}`
	},
	EMPLOYEES: {
		path: `employees`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/users/employees`
	},
	GUESTS: {
		path: `guests`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/users/guests `
	},
	HALLS: {
		path: `halls`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/halls`
	},
	HALL: {
		path: `halls/${HALL_ID}`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/halls/${HALL_ID}`
	},
	TABLES: {
		path: `halls/${HALL_ID}/tables`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/halls/${HALL_ID}/tables`
	},
	SHIFT: {
		path: `shift`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/shift`
	},
	ORDERS: {
		path: `orders`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/orders`
	},
	ACTIVE_ORDERS: {
		path: `active-orders`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/orders/active-orders`
	},
	ACTIVE_ORDER: {
		path: `orders/active-orders/${ORDER_ID}`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/orders/active-orders/${ORDER_ID}`
	},
	HISTORY_ORDERS: {
		path: `history-orders`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/orders/history-orders`
	},
	HISTORY_ORDER: {
		path: `orders/history-orders/${ORDER_ID}`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/orders/history-orders/${ORDER_ID}`
	},
	MENU: {
		path: `menu`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/menu`
	},
	CATEGORIES: {
		path: `categories`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/menu/categories`
	},
	CATEGORY: {
		path: `categories/${CATEGORY_ID}`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/menu/categories/${CATEGORY_ID}`
	},
	PRODUCTS: {
		path: `products`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/menu/products`
	},
	PRODUCT: {
		path: `products/${PRODUCT_ID}`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/menu/products/${PRODUCT_ID}`
	},
	ATTRIBUTES: {
		path: `attributes`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/menu/attributes`
	},
	ATTRIBUTE: {
		path: `attributes/${ATTRIBUTE_ID}`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/menu/attributes/${ATTRIBUTE_ID}`
	},
	COMMANDS: {
		path: `commands`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/commands`
	},
	COMMAND: {
		path: `commands/${COMMAND_ID}`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/commands/${COMMAND_ID}`
	},
	ACCESS: {
		path: `access`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/access`
	},
	WALLET: {
		path: `wallet`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/wallet`
	},
	CONTRACT: {
		path: `contract`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/contract`
	},
	PAYMENT_SYSTEMS: {
		path: `payment-systems`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/payment-systems`
	},
	PAYMENT_SYSTEM: {
		path: `payment-systems/${PAYMENT_SYSTEM_ID}`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/payment-systems/${PAYMENT_SYSTEM_ID}`
	},
	ACCOUNTING_SYSTEMS: {
		path: `accounting-systems`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/accounting-systems`
	},
	ACCOUNTING_SYSTEM: {
		path: `accounting-systems/${ACCOUNTING_SYSTEM_ID}`,
		absolutePath: `/companies/${COMPANY_ID}/places/${PLACE_ID}/accounting-systems/${ACCOUNTING_SYSTEM_ID}`
	}
};
