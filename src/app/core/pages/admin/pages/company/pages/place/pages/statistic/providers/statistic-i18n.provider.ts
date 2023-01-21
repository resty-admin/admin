import { getI18nProvider } from "@shared/i18n";

import { STATISTIC_PAGE_I18N } from "../constants";

export const STATISTIC_I18N_PROVIDER = getI18nProvider(STATISTIC_PAGE_I18N, (lang) => import(`../i18n/${lang}.json`));
