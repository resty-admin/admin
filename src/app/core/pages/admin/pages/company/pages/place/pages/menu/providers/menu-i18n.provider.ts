import { getI18nProviders } from "@shared/i18n";

import { MENU_PAGE } from "../constants";

export const MENU_I18N_PROVIDERS = getI18nProviders(MENU_PAGE, (lang) => import(`../i18n/${lang}.json`));
