import { getI18nProvider } from "@shared/i18n";

import { USER_DIALOG_I18N } from "../constants";

export const USER_DIALOG_I18N_PROVIDER = getI18nProvider(USER_DIALOG_I18N, (lang) => import(`../i18n/${lang}.json`));
