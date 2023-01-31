import { getI18nProvider } from "@shared/i18n";

import { MENU_PAGE } from "../constants";

export const MENU_I18N_PROVIDER = getI18nProvider(MENU_PAGE, (lang) => import(`../i18n/${lang}.json`));
