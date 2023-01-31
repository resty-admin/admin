import { getI18nProviders } from "@shared/i18n";

import { HISTORY_ORDER_PAGE } from "../constants";

export const HISTORY_ORDER_I18N_PROVIDERS = getI18nProviders(
	HISTORY_ORDER_PAGE,
	(lang) => import(`../i18n/${lang}.json`)
);
