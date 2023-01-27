import { getI18nProvider } from "@shared/i18n";

import { COMPANIES_PAGE } from "../constants";

export const COMPANIES_PAGE_I18N_PROVIDER = getI18nProvider(COMPANIES_PAGE, (lang) => import(`../i18n/${lang}.json`));
