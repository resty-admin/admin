import { getI18nProvider } from "@shared/i18n";

import { COMPANY_DIALOG_I18N } from "../constants";

export const COMPANY_DIALOG_I18N_PROVIDER = getI18nProvider(
	COMPANY_DIALOG_I18N,
	(lang) => import(`../i18n/${lang}.json`)
);
