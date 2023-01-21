import { getI18nProvider } from "@shared/i18n";

import { MENU_PAGE_I18N } from "../constants";

export const MENU_I18N_PROVIDER = getI18nProvider(MENU_PAGE_I18N, (lang) => import(`../i18n/${lang}.json`));
