import { getI18nProviders } from "@shared/i18n";

import { PAYMENT_SYSTEM_DIALOG } from "../constants";

export const PAYMENT_SYSTEM_DIALOG_I18N_PROVIDERS = getI18nProviders(
	PAYMENT_SYSTEM_DIALOG,
	(lang) => import(`../i18n/${lang}.json`)
);
