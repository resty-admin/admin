import { getI18nProvider } from "@shared/i18n";

import { RESET_PASSWORD_PAGE } from "../constants";

export const RESET_PASSWORD_I18N_PROVIDER = getI18nProvider(
	RESET_PASSWORD_PAGE,
	(lang) => import(`../i18n/${lang}.json`)
);
