import { getI18nProviders } from "@shared/i18n";

import { COMPANY_DIALOG } from "../constants";

export const COMPANY_DIALOG_I18N_PROVIDERS = getI18nProviders(COMPANY_DIALOG, (lang) => import(`../i18n/${lang}.json`));
