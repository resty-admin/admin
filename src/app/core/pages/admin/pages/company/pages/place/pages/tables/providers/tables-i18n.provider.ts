import { getI18nProvider } from "@shared/i18n";

import { TABLES_PAGE_I18N } from "../constants";

export const TABLES_I18N_PROVIDER = getI18nProvider(TABLES_PAGE_I18N, (lang) => import(`../i18n/${lang}.json`));
