import { getI18nProviders } from "@shared/i18n";

import { PAYMENT_SYSTEMS_PAGE } from "../constants";

export const PAYMENT_SYSTEMS_I18N_PROVIDERS = getI18nProviders(
	PAYMENT_SYSTEMS_PAGE,
	(lang) => import(`../i18n/${lang}.json`)
);
