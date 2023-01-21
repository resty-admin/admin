import { getI18nProvider } from "@shared/i18n";

import { ACCOUNTING_SYSTEMS_PAGE_I18N } from "../constants";

export const ACCOUNTING_SYSTEMS_I18N_PROVIDER = getI18nProvider(
	ACCOUNTING_SYSTEMS_PAGE_I18N,
	(lang) => import(`../i18n/${lang}.json`)
);
