import { getI18nProvider } from "src/app/shared/i18n";

import { ASIDE_I18N } from "../constants";

export const ASIDE_I18N_PROVIDER = getI18nProvider(ASIDE_I18N, (lang) => import(`../i18n/${lang}.json`));
