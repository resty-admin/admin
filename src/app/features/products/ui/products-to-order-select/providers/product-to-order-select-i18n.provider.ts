import { getI18nProviders } from "@shared/i18n";

import { PRODUCTS_TO_ORDER_SELECT } from "../constants";

export const PRODUCTS_TO_ORDER_SELECT_I18N_PROVIDERS = getI18nProviders(
	PRODUCTS_TO_ORDER_SELECT,
	(lang) => import(`../i18n/${lang}.json`)
);
