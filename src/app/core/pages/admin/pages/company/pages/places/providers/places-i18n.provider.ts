import { getI18nProvider } from "@shared/i18n";

import { PLACES_PAGE_I18N } from "../constants";

export const PLACES_I18N_PROVIDER = getI18nProvider(PLACES_PAGE_I18N, (lang) => import(`../i18n/${lang}.json`));
