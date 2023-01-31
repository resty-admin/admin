import { getI18nProvider } from "@shared/i18n";

import { SHIFT_PAGE } from "../constants";

export const SHIFT_I18N_PROVIDER = getI18nProvider(SHIFT_PAGE, (lang) => import(`../i18n/${lang}.json`));
