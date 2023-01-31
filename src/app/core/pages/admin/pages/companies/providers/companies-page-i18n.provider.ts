import { getI18nProviders } from "@shared/i18n";

import { COMPANIES_PAGE } from "../constants";

export const COMPANIES_PAGE_I18N_PROVIDERS = getI18nProviders(COMPANIES_PAGE, (lang) => import(`../i18n/${lang}.json`));
