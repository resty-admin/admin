import { getI18nProvider } from "@shared/i18n";

import { COMPANY_DIALOG } from "../constants";

export const COMPANY_DIALOG_I18N_PROVIDER = getI18nProvider(COMPANY_DIALOG, (lang) => import(`../i18n/${lang}.json`));
