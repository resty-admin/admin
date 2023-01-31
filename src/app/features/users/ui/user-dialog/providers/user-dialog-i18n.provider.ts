import { getI18nProvider } from "@shared/i18n";

import { USER_DIALOG } from "../constants";

export const USER_DIALOG_I18N_PROVIDER = getI18nProvider(USER_DIALOG, (lang) => import(`../i18n/${lang}.json`));
