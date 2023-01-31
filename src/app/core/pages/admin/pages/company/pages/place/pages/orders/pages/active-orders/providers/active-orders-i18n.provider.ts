import { getI18nProviders } from "@shared/i18n";

import { ACTIVE_ORDERS_PAGE } from "../constants";

export const ACTIVE_ORDER_I18N_PROVIDERS = getI18nProviders(
	ACTIVE_ORDERS_PAGE,
	(lang) => import(`../i18n/${lang}.json`)
);
