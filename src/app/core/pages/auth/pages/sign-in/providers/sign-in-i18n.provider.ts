import { getI18nProvider } from "@shared/i18n";

import { SIGN_IN_PAGE } from "../constants";

export const SIGN_IN_I18N_PROVIDER = getI18nProvider(SIGN_IN_PAGE, (lang) => import(`../i18n/${lang}.json`));
