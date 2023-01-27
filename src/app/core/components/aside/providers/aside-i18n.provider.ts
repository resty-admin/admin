import { getI18nProvider } from "@shared/i18n";

import { ASIDE } from "../constants";

export const ASIDE_I18N_PROVIDER = getI18nProvider(ASIDE, (lang) => import(`../i18n/${lang}.json`));
