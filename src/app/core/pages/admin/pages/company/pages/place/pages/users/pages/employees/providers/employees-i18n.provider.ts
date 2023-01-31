import { getI18nProviders } from "@shared/i18n";

import { EMPLOYEES_PAGE } from "../constants";

export const EMPLOYEES_I18N_PROVIDERS = getI18nProviders(EMPLOYEES_PAGE, (lang) => import(`../i18n/${lang}.json`));
