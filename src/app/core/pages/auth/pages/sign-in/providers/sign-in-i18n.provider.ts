import { getI18nProvider } from "src/app/shared/i18n";

import { SIGN_IN_PAGE_I18N } from "../constants";

export const SIGN_IN_I18N_PROVIDER = getI18nProvider(SIGN_IN_PAGE_I18N, (lang) => import(`../i18n/${lang}.json`));
