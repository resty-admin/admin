import { getI18nProviders } from "@shared/i18n";

import { ADD_EMPLOYEE_DIALOG } from "../constants";

export const ADD_EMPLOYEE_DIALOG_I18N_PROVIDERS = getI18nProviders(
	ADD_EMPLOYEE_DIALOG,
	(lang) => import(`../i18n/${lang}.json`)
);
