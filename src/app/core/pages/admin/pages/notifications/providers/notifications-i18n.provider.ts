import { getI18nProviders } from "@shared/i18n";

import { NOTIFICATIONS_PAGE } from "../constants";

export const NOTIFICATIONS_I18N_PROVIDERS = getI18nProviders(
	NOTIFICATIONS_PAGE,
	(lang) => import(`../i18n/${lang}.json`)
);
