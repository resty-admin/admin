import { getI18nProvider } from "@shared/i18n";

import { ADD_EMPLOYEE_DIALOG } from "../constants";

export const ADD_EMPLOYEE_DIALOG_I18N_PROVIDER = getI18nProvider(
	ADD_EMPLOYEE_DIALOG,
	(lang) => import(`../i18n/${lang}.json`)
);
