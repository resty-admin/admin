import { getI18nProvider } from "@shared/i18n";

import { PRODUCT_TO_ORDER } from "../constants";

export const PRODUCT_TO_ORDER_I18N_PROVIDER = getI18nProvider(
	PRODUCT_TO_ORDER,
	(lang) => import(`../i18n/${lang}.json`)
);
