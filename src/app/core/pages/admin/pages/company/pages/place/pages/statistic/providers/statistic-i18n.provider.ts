import { getI18nProvider } from "@shared/i18n";

import { STATISTIC_PAGE } from "../constants";

export const STATISTIC_I18N_PROVIDER = getI18nProvider(STATISTIC_PAGE, (lang) => import(`../i18n/${lang}.json`));
