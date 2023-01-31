import { getI18nProviders } from "@shared/i18n";

import { PROFILE_PAGE } from "../constants";

export const PROFILE_I18N_PROVIDERS = getI18nProviders(PROFILE_PAGE, (lang) => import(`../i18n/${lang}.json`));
