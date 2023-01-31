import { getI18nProviders } from "@shared/i18n";

import { ACTIVE_ORDER_PAGE } from "../constants";

export const ACTIVE_ORDER_I18N_PROVIDERS = getI18nProviders(
	ACTIVE_ORDER_PAGE,
	(lang) => import(`../i18n/${lang}.json`)
);
