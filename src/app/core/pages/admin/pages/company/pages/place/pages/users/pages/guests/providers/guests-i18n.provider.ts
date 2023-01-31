import { getI18nProviders } from "@shared/i18n";

import { GUESTS_PAGE } from "../constants";

export const GUESTS_I18N_PROVIDERS = getI18nProviders(GUESTS_PAGE, (lang) => import(`../i18n/${lang}.json`));
