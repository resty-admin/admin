import { getI18nProvider } from "@shared/i18n";

import { HALL_PAGE_I18N } from "../constants";

export const HALL_I18N_PROVIDER = getI18nProvider(HALL_PAGE_I18N, (lang) => import(`../i18n/${lang}.json`));
