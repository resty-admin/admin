import { getI18nProvider } from "@shared/i18n";

import { HISTORY_ORDER_PAGE } from "../constants";

export const HISTORY_ORDER_I18N_PROVIDER = getI18nProvider(
	HISTORY_ORDER_PAGE,
	(lang) => import(`../i18n/${lang}.json`)
);
