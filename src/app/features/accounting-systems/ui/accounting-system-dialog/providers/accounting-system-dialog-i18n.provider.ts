import { getI18nProviders } from "@shared/i18n";

import { ACCOUNTING_SYSTEM_DIALOG } from "../constants";

export const ACCOUNTING_SYTEM_DILAOG_I18N_PROVIDERS = getI18nProviders(
	ACCOUNTING_SYSTEM_DIALOG,
	(lang) => import(`../i18n/${lang}.json`)
);
