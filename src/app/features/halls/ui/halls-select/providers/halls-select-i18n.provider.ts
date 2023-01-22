import { getI18nProvider } from "@shared/i18n";

import { HALLS_SELECT_I18N } from "../constants";

export const HALLS_SELECT_I18N_PROVIDER = getI18nProvider(HALLS_SELECT_I18N, (lang) => import(`../i18n/${lang}.json`));
