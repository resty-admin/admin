import { getI18nProviders } from "@shared/i18n";

import { PLACES_PAGE } from "../constants";

export const PLACES_I18N_PROVIDERS = getI18nProviders(PLACES_PAGE, (lang) => import(`../i18n/${lang}.json`));
