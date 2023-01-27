import { getI18nProvider } from "@shared/i18n";

import { PROFILE_PAGE } from "../constants";

export const PROFILE_I18N_PROVIDER = getI18nProvider(PROFILE_PAGE, (lang) => import(`../i18n/${lang}.json`));
