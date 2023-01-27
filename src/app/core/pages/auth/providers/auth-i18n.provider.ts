import { getI18nProvider } from "@shared/i18n";

import { AUTH_PAGE } from "../constants";

export const AUTH_I18N_PROVIDER = getI18nProvider(AUTH_PAGE, (lang) => import(`../i18n/${lang}.json`));
