import { getI18nProvider } from "@shared/i18n";

import { HISTORY_ORDERS_PAGE_I18N } from "../constants";

export const HISTORY_ORDERS_I18N_PROVIDER = getI18nProvider(
	HISTORY_ORDERS_PAGE_I18N,
	(lang) => import(`../i18n/${lang}.json`)
);
