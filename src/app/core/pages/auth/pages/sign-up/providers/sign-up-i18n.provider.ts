import { getI18nProviders } from "@shared/i18n";

import { SIGN_UP_PAGE } from "../constants";

export const SIGN_UP_I18N_PROVIDERS = getI18nProviders(SIGN_UP_PAGE, (lang) => import(`../i18n/${lang}.json`));
