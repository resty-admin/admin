import { getI18nProvider } from "@shared/i18n";

import { PLACES_PAGE } from "../constants";

export const PLACES_I18N_PROVIDER = getI18nProvider(PLACES_PAGE, (lang) => import(`../i18n/${lang}.json`));
