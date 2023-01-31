import { getI18nProviders } from "@shared/i18n";

import { SHIFT_PAGE } from "../constants";

export const SHIFT_I18N_PROVIDERS = getI18nProviders(SHIFT_PAGE, (lang) => import(`../i18n/${lang}.json`));
