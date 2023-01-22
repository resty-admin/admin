import { getI18nProvider } from "@shared/i18n";

import { ACCOUNTING_SYSTEM_DIALOG_I18N } from "../constants";

export const ACCOUNTING_SYTEM_DILAOG_I18N_PROVIDER = getI18nProvider(
	ACCOUNTING_SYSTEM_DIALOG_I18N,
	(lang) => import(`../i18n/${lang}.json`)
);
