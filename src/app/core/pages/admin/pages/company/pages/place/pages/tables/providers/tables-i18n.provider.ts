import { getI18nProvider } from "@shared/i18n";

import { TABLES_PAGE } from "../constants";

export const TABLES_I18N_PROVIDER = getI18nProvider(TABLES_PAGE, (lang) => import(`../i18n/${lang}.json`));
