import { getI18nProvider } from "@shared/i18n";

import { HALLS_PAGE } from "../constants";

export const HALLS_I18N_PROVIDER = getI18nProvider(HALLS_PAGE, (lang) => import(`../i18n/${lang}.json`));
