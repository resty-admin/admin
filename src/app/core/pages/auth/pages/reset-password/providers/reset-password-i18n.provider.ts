import { getI18nProviders } from "@shared/i18n";

import { RESET_PASSWORD_PAGE } from "../constants";

export const RESET_PASSWORD_I18N_PROVIDERS = getI18nProviders(
	RESET_PASSWORD_PAGE,
	(lang) => import(`../i18n/${lang}.json`)
);
