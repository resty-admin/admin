import { getI18nProvider } from "@shared/i18n";

import { GUESTS_PAGE } from "../constants";

export const GUESTS_I18N_PROVIDER = getI18nProvider(GUESTS_PAGE, (lang) => import(`../i18n/${lang}.json`));
