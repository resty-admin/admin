import { getI18nProvider } from "@shared/i18n";

import { WELCOME_PAGE } from "../constants";

export const WELCOME_I18N_PROVIDER = getI18nProvider(WELCOME_PAGE, (lang) => import(`../i18n/${lang}.json`));
