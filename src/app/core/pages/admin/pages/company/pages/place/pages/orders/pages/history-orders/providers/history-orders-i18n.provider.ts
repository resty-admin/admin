import { getI18nProvider } from "@shared/i18n";

import { HISTORY_ORDERS_PAGE } from "../constants";

export const HISTORY_ORDERS_I18N_PROVIDER = getI18nProvider(
	HISTORY_ORDERS_PAGE,
	(lang) => import(`../i18n/${lang}.json`)
);
