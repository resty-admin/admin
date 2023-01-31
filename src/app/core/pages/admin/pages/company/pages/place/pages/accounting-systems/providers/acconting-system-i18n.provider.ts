import { getI18nProvider } from "@shared/i18n";

import { ACCOUNTING_SYSTEMS_PAGE } from "../constants";

export const ACCOUNTING_SYSTEMS_I18N_PROVIDER = getI18nProvider(
	ACCOUNTING_SYSTEMS_PAGE,
	(lang) => import(`../i18n/${lang}.json`)
);
