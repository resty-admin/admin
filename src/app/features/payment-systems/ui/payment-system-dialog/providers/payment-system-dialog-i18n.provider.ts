import { getI18nProvider } from "@shared/i18n";

import { PAYMENT_SYSTEM_DIALOG } from "../constants";

export const PAYMENT_SYSTEM_DIALOG_I18N_PROVIDER = getI18nProvider(
	PAYMENT_SYSTEM_DIALOG,
	(lang) => import(`../i18n/${lang}.json`)
);
