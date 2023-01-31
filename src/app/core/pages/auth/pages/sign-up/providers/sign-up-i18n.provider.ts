import { getI18nProvider } from "@shared/i18n";

import { SIGN_UP_PAGE } from "../constants";

export const SIGN_UP_I18N_PROVIDER = getI18nProvider(SIGN_UP_PAGE, (lang) => import(`../i18n/${lang}.json`));
