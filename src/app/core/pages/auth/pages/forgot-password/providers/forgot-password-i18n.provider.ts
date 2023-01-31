import { getI18nProviders } from "@shared/i18n";

import { FORGOT_PASSWORD_PAGE } from "../constants";

export const FORGOT_PASSWORD_I18N_PROVIDERS = getI18nProviders(
	FORGOT_PASSWORD_PAGE,
	(lang) => import(`../i18n/${lang}.json`)
);
