import { getI18nProvider } from "@shared/i18n";

import { FORGOT_PASSWORD_PAGE_I18N } from "../constants";

export const FORGOT_PASSWORD_I18N_PROVIDER = getI18nProvider(
	FORGOT_PASSWORD_PAGE_I18N,
	(lang) => import(`../i18n/${lang}.json`)
);
